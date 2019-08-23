class Episode < ApplicationRecord
  validates :title, :date, presence: true

  has_many :announcements
  has_many :timecodes
  has_and_belongs_to_many :authors
  has_and_belongs_to_many :guests
  has_and_belongs_to_many :sponsors

  has_one_attached :backup_video
  has_one_attached :backup_audio

  def update_youtube_info
    @video = Yt::Video.new id: video
    self.broadcast_begin = @video.actual_start_time
    self.broadcast_end = @video.actual_end_time
    self.youtube_status = check_youtube_status(@video)
    save
  end

  VALID_YOUTUBE_LINK =
    %r{(http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?)}.freeze
  YOUTUBE_VIDEO_IDENTIFIER = %r{(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)}.freeze

  def self.create(args)
    super(prepare_params(args).to_h)
  end

  def update(args)
    super(self.class.prepare_params(args).to_h)
  end

  class << self
    def prepare_params(args)
      if args[:video] && args[:date]
        raise(ActiveRecord::RecordInvalid.new, 'Invalid video') unless args[:video].match VALID_YOUTUBE_LINK

        args[:video] = args[:video].match(YOUTUBE_VIDEO_IDENTIFIER)[5]
        args[:date] = Time.parse(args[:date]).utc
      end
      args
    end
  end

  private

  def check_youtube_status(video)
    video.live_broadcast_content == 'none' ? 'over' : video.live_broadcast_content
  end

  include AASM

  aasm column: 'status', whiny_transitions: false do
    state :draft, initial: true
    state :announced, :online, :processing, :finished

    event :announcement do
      transitions from: :draft, to: :announced, guard: :valid_for_announcement?
    end

    event :online do
      transitions from: :announced, to: :online
    end

    event :processing do
      transitions from: :online, to: :processing
    end

    event :finished do
      transitions from: :processing, to: :finished
    end
  end

  def valid_for_announcement?
    title && date && video && description.present?
  end
end

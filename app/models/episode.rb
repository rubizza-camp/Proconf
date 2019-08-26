class Episode < ApplicationRecord
  validates :title, :date, presence: true

  has_many :announcements
  has_many :timecodes
  has_and_belongs_to_many :authors

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
end

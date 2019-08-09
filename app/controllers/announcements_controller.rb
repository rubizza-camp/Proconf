class AnnouncementsController < ApplicationController
  before_action :set_announcement, only: %i[edit update show]

  load_and_authorize_resource

  def index
    @episode = Episode.find(params['episode_id'])
    @announcements = Announcement.where('episode_id = ?', params['episode_id'])
  end

  def show
    # @announcement = Announcement.find(params[:id])
  end

  def new
    @announcement = Announcement.new
  end

  def create
    announcement = Announcement.new(announcement_params)
    if announcement.save
      redirect_to episode_announcements_path
    else
      redirect_to new_episode_announcement_path
      # add notification
    end
  end

  def edit
    # @announcement = Announcement.find(params[:id])
  end

  def update
    if @announcement.update(announcement_params)
      redirect_to episode_announcement_path
    else
      redirect_to :edit
    end
  end

  private

  def announcement_params
    p = params.require(:announcement).permit(:episode_id, :title, :date, :target_resource, :image, :video)
    p['episode_id'] = params['episode_id']
    p
  end

  def set_announcement
    @announcement = Announcement.find(params[:id])
  end
end

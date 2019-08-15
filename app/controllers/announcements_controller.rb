class AnnouncementsController < ApplicationController
  before_action :set_announcement, only: %i[edit update show destroy]
  before_action :set_episode, only: %i[index new create]

  load_and_authorize_resource

  def index; end

  def show; end

  def new
    @announcement = @episode.announcements.new
  end

  def create
    announcement = @episode.announcements.new(announcement_params)

    if announcement.save
      redirect_to episode_announcements_path
    else
      redirect_to new_episode_announcement_path
    end
  end

  def edit; end

  def update
    if @announcement.update(announcement_params)
      redirect_to episode_announcement_path, notice: 'blablabla'
    else
      redirect_to edit_episode_announcement_path
    end
  end

  def destroy
    @announcement.destroy

    redirect_to episode_announcements_path
  end

  private

  def announcement_param_names
    %i[title date target_resource image video]
  end

  def announcement_params
    params.require(:announcement).permit(announcement_param_names)
  end

  def set_announcement
    @announcement = Announcement.find(params[:id])
  end

  def set_episode
    @episode = Episode.find(params['episode_id'])
  end
end

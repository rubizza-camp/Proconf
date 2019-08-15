class EpisodesController < ApplicationController
  load_and_authorize_resource
  before_action :set_episode, except: %i[index create new]

  def index
    @announcement_episodes = Episode.where(status: 'announcement').order(created_at: :desc).last(2)
    @online_episodes = Episode.where(status: 'online').order(created_at: :desc)
    @finished_episodes = Episode.where(status: 'finished').order(created_at: :desc).page params[:page]
  end

  def show; end

  def edit; end

  def new; end

  def create
    @episode = Episode.create(episode_params.merge(created_by: current_user))

    if @episode.valid?
      redirect_to episodes_url, notice: 'Successfully created'
    else
      render :new, notice: 'Something wrong'
    end
  end

  def update
    if @episode.update(episode_params)
      redirect_to episode_path
    else
      redirect_to edit_episode_path
    end
  end

  def add_start
    @episode.update(actual_start: Time.now)
    redirect_to episode_path(@episode)
  end

  def add_finish
    @episode.update(actual_finish: Time.now)
    redirect_to episode_path(@episode)
  end

  def update_youtube_data
    @episode.update_youtube_info
    redirect_to episode_path(@episode.id)
  end

  def to_announcement
    if @episode.announcement!
      redirect_to episode_path(@episode)
    else
      redirect_to episode_path(@episode)
    end
  end

  private

  def set_episode
    @episode = Episode.find(params[:id])
  end

  def episode_params
    params.permit(:title, :video, :date, :description)
  end
end

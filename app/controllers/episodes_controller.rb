class EpisodesController < ApplicationController
  load_and_authorize_resource
  before_action :update_youtube_info, only: [:show]
  before_action :set_episode, only: %i[edit show update to_announcement update_youtube_info add_start add_finish]

  def index
    @episodes = Episode.order(created_at: :desc).page params[:page]
  end

  def show; end

  def edit; end

  def update_youtube_info
    # YoutubeService.new(@episode).update
  end

  def add_start_or_finish
    params[:started] == 'true' ? add_start : add_finish
  end

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
    @episode.actual_start = Time.now
    @episode.save
    redirect_to "/episodes/#{@episode.id}"
  end

  def add_finish
    @episode.actual_finish = Time.now
    @episode.save
    redirect_to "/episodes/#{@episode.id}"
  end

  private

  def set_episode
    @episode = Episode.find(params[:id])
  end

  def episode_params
    params.permit(:title, :video, :date, :description)
  end
end

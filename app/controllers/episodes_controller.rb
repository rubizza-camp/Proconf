class EpisodesController < ApplicationController
  load_and_authorize_resource
  before_action :set_episode, only: %i[edit show update]

  def index
    @episodes = Episode.order(created_at: :desc).page params[:page]
  end

  def show; end

  def edit; end

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

  private

  def set_episode
    @episode = Episode.find(params[:id])
  end

  def episode_params
    params.permit(:title, :video, :date, :description)
  end
end

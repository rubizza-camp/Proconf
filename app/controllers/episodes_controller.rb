class EpisodesController < ApplicationController
  load_and_authorize_resource
  before_action :set_episode, only: %i[edit show update]

  def index
    @episodes = Episode.order(created_at: :desc).page params[:page]
  end

  def show; end

  def edit; end

  def create
    @episode = Episode.new(episode_params)
    @episode.created_by = current_user

    if @episode.save
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
    params[:video] = params[:video].split('=').last
    params[:date] = datetime

    params.permit(:title, :video, :date, :description)
  end

  def datetime
    Time.parse("#{params[:date]} #{params[:time]}").utc
  end
end

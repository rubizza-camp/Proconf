class EpisodesController < ApplicationController
  load_and_authorize_resource

  def index
    @episodes = Episode.order(created_at: :desc).page params[:page]
  end

  def show
    @episode = Episode.find(params[:id])
  end

  def create
    @episode = Episode.new(episode_params.merge(created_by: current_user))

    if @episode.save
      redirect_to episodes_url, notice: 'Successfully created'
    else
      render :new, notice: 'Something wrong'
    end
  end

  private

  def episode_params
    params[:video] = params[:video].split('=').last
    params[:date] = datetime
    params.delete(:time)

    params.permit(:title, :video, :date, :description)
  end

  def datetime
    Time.parse("#{params[:date]} #{params[:time]}").utc
  end
end

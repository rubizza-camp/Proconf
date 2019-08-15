class EpisodesController < ApplicationController
  load_and_authorize_resource
  before_action :set_episode, only: %i[edit show update]

  def index
    @episodes = Episode.order(created_at: :desc).page params[:page]
  end

  def show; end

  def edit; end

  def create
    @episode = Episode.new(params_for_episode)
    @episode.created_by = current_user

    if @episode.save
      redirect_to episodes_url, notice: 'Successfully created'
    else
      render :new, notice: 'Something wrong'
    end
  end

  def update
    if @episode.update(params_for_episode)
      redirect_to episode_path
    else
      redirect_to edit_episode_path
    end
  end

  private

  def set_episode
    @episode = Episode.find(params[:id])
  end

  def permitted_params
    params.permit(:title, :video, :date, :description)
  end

  def params_for_episode(permit_params = permitted_params)
    permit_params[:video] = permit_params[:video]
                            .match(%r{(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)})[5]
    permit_params[:date] = datetime
    permit_params
  end

  def datetime
    Time.parse("#{params[:date]} #{params[:time]}").utc
  end
end

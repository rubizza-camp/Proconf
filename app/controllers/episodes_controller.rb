class EpisodesController < ApplicationController
  EPISODES_SIZE = 5

  def index
    @episodes = Episode.order(id: :desc).page params[:page]
  end

  def show
    @episode = Episode.find_by_id(params[:id])
  end
end

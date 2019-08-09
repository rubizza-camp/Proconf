class EpisodesController < ApplicationController
  EPISODES_SIZE = 5

  def index
    @episodes = Episode.order(created_at: :desc).page params[:page]
  end

  def show
    @episode = Episode.find(params[:id])
  end
end

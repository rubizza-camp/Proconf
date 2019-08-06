class EpisodesController < ApplicationController
  load_and_authorize_resource

  def index
    @episodes = Episode.order(created_at: :desc).page params[:page]
  end

  def show
    @episode = Episode.find(params[:id])
  end
end

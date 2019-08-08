class EpisodesController < ApplicationController
  EPISODES_SIZE = 5
  def index
    @page = (params[:page] || 0).to_i
    @last_page = Episode.count/EPISODES_SIZE.ceil
    @episodes = Episode.offset(EPISODES_SIZE * @page).limit(EPISODES_SIZE)
  end

  def show
    @episode = Episode.find_by_id(params[:id])
  end
end

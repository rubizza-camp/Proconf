module Api
  module V1
    class EpisodesController < ApiController
      before_action :set_episode, except: %i[index]
      def index
        episodes = Episode.order(id: :asc)
        render json: episodes
      end

      def show
        render json: @episode
      end

      def edit; end

      def new; end

      private

      def set_episode
        @episode = Episode.find(params[:id])
      end
    end
  end
end

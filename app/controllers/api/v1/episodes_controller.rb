module Api
  module V1
    class EpisodesController < ApiController
      before_action :set_episode, except: %i[index create add_start add_finish update_youtube_data]

      def index
        episodes = Episode.order(id: :asc)
        render json: episodes, each_serializer: EpisodesSerializer, root: 'data'
      end

      def show
        render json: @episode, serializer: EpisodesSerializer
      end

      def create
        @episode = Episode.create(episode_params)

        if @episode.valid?
          render json: @episode, serializer: EpisodesSerializer
        else
          render json: { 'error': @episode.errors }
        end
      end

      def update
        if @episode.update(episode_params)
          render json: 'Successfuly updated'
        else
          render json: 'Something wrong'
        end
      end

      def destroy
        @episode.timecodes.each(&:delete)
        @episode.announcements.each(&:delete)
        @episode.delete
      end

      def add_start
        episode = Episode.find(params[:episode_id])
        episode.update(actual_start: Time.now)
        render json: 'OK'
      end

      def add_finish
        episode = Episode.find(params[:episode_id])
        episode.update(actual_finish: Time.now)
        render json: 'OK'
      end

      def update_youtube_data
        episode = Episode.find(params[:episode_id])
        episode.update_youtube_info
        render json: 'OK'
      end

      private

      def set_episode
        @episode = Episode.find(params[:id])
      end

      def episode_params
        params.permit(:title, :video, :date, :description)
      end
    end
  end
end

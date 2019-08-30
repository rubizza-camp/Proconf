module Api
  module V1
    class EpisodesController < ApiController
      before_action :authenticate_user, except: %i[index show]
      before_action :set_episode, except: %i[index create]

      def index
        episodes = Episode.order(id: :asc)
        render json: episodes, each_serializer: EpisodesSerializer, root: 'data'
      end

      def show
        render json: @episode, serializer: EpisodesSerializer, root: 'data'
      end

      def create
        episode = Episode.create(episode_params)

        ParticipantsService.execute(params, episode)

        if episode.valid?
          render json: episode, serializer: EpisodesSerializer
        else
          render json: { 'error': episode.errors }
        end
      end

      def update
        binding.pry
        if @episode.update(episode_params)
          render json: @episode, serializer: EpisodesSerializer
        else
          render json: { 'error': @episode.errors }
        end
      end

      def destroy
        @episode.destroy
      end

      def add_start
        @episode.update(actual_start: Time.now)
        render json: 'OK'
      end

      def add_finish
        @episode.update(actual_finish: Time.now)
        render json: 'OK'
      end

      def update_youtube_data
        @episode.update_youtube_info
        render json: 'OK'
      end

      def to_announcement
        @episode.announcement!
        render json: @episode, serializer: StatusesSerializer
      end

      def to_online
        @episode.online!
        render json: @episode, serializer: StatusesSerializer
      end

      def to_finished
        @episode.finished!
        render json: @episode, serializer: StatusesSerializer
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

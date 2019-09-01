module Api
  module V1
    class EpisodesController < ApiController
      before_action :authenticate_user, except: %i[index show]
      before_action :set_episode, except: %i[index create]

      def index
        episodes = current_user ? Episode.order(:id) : Episode.where.not(status: 'draft').order(:id)
        render json: episodes, each_serializer: EpisodesSerializer, root: 'data'
      end

      def show
        if current_user.nil? && @episode.status == 'draft'
          head :no_content
        else
          render json: @episode, serializer: EpisodesSerializer, root: 'data'
        end
      end

      def create
        episode = Episode.create(episode_params)

        if episode.valid?
          ParticipantsService.execute(params, episode)
          render json: episode, serializer: EpisodesSerializer
        else
          render json: { 'error': episode.errors }
        end
      end

      def update
        if @episode.update(episode_params)
          ParticipantsService.execute(params, @episode)
          render json: @episode, serializer: EpisodesSerializer
        else
          render json: { 'error': @episode.errors }
        end
      end

      def destroy
        @episode.destroy
        render json: 'ok'
      end

      def add_start
        @episode.update(actual_start: Time.now)
        render json: { "id": @episode.id, "title": @episode.title, "actual_start": @episode.actual_start }
      end

      def add_finish
        @episode.update(actual_finish: Time.now)
        render json: { "id": @episode.id, "title": @episode.title, "actual_finish": @episode.actual_finish }
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

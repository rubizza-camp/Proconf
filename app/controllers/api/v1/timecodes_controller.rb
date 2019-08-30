module Api
  module V1
    class TimecodesController < ApiController
      before_action :authenticate_user, except: %i[index show]
      before_action :set_timecode, only: %i[show edit update destroy]
      before_action :set_episode, only: %i[index create]

      def index
        render json: @episode.timecodes, each_serializer: TimecodesSerializer
      end

      def show
        render json: @timecode, serializer: TimecodesSerializer
      end

      def create
        timecode = @episode.timecodes.create(timecode_params)

        if timecode.valid?
          render json: timecode, serializer: TimecodesSerializer
        else
          render json: { 'errors': timecode.errors }
        end
      end

      def update
        if @timecode.update(timecode_params)
          render json: @timecode, serializer: TimecodesSerializer
        else
          render json: { 'errors': @timecode.errors }
        end
      end

      def destroy
        @timecode.destroy
        render json: 'Succesfully'
      end

      private

      def timecode_params
        params.permit(:title, :time)
      end

      def set_timecode
        @timecode = Timecode.find(params[:id])
      end

      def set_episode
        @episode = Episode.find(params['episode_id'])
      end
    end
  end
end

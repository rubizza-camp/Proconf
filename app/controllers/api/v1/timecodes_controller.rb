module Api
  module V1
    class TimecodesController < ApiController
      before_action :set_timecode, only: %i[edit update show destroy send_timecode]
      before_action :set_episode, only: %i[index new create]

      def index
        render json: @episode.timecodes
      end

      def show
        render json: @timecode
      end

      def create
        timecode = @episode.timecodes.create(timecode_params)

        if timecode.valid?
          render json: 'Timecode successfully created!'
        else
          render json: 'Error while creation'
        end
      end

      def update
        if @timecode.update(timecode_params)
          render json: 'Timecode successfully updated!'
        else
          render json: 'Error while update'
        end
      end

      def destroy
        @timecode.delete
        render json: 'Succesfully'
      end

      private

      def timecode_param_names
        %i[title time]
      end

      def timecode_params
        params.permit(timecode_param_names)
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

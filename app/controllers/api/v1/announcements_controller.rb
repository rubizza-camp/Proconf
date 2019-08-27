module Api
  module V1
    class AnnouncementsController < ApiController
      before_action :set_announcement, only: %i[edit update show destroy]
      before_action :set_episode, only: %i[index create]

      def index
        render json: @episode.announcements
      end

      def show
        render json: @announcement
      end

      def create
        announcement = @episode.announcements.create(announcement_params)

        if announcement.valid?
          render json: 'Announcement successfully created!'
        else
          render json: 'Error while creation'
        end
      end

      def update
        if @announcement.update(announcement_params)
          render json: 'Successfully'
        else
          render json: 'Uncomplete'
        end
      end

      def destroy
        @announcement.destroy

        render json: 'Succesfully'
      end

      private

      def announcement_param_names
        %i[title date target_resource image video]
      end

      def announcement_params
        params.permit(announcement_param_names)
      end

      def set_announcement
        @announcement = Announcement.find(params[:id])
      end

      def set_episode
        @episode = Episode.find(params['episode_id'])
      end
    end
  end
end

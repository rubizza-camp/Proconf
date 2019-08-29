module Api
  module V1
    class AnnouncementsController < ApiController
      before_action :authenticate_user
      before_action :set_announcement, only: %i[edit update destroy]
      before_action :set_episode, only: :create

      def create
        announcement = @episode.announcements.create(announcement_params)

        if announcement.valid?
          render json: announcement, serializer: AnnouncementsSerializer
        else
          render json: { 'errors': announcement.errors }
        end
      end

      def update
        if @announcement.update(announcement_params)
          render json: announcement, serializer: AnnouncementsSerializer
        else
          render json: { 'errors': announcement.errors }
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

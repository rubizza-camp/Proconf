module Api
  module V1
    class AnnouncementsController < ApiController
      before_action :authenticate_user, except: %i[index show]
      before_action :set_announcement, only: %i[show edit update destroy send_announcement]
      before_action :set_episode, only: %i[index create]

      def index
        render json: @episode.announcements, each_serializer: AnnouncementsSerializer
      end

      def show
        render json: @announcement, serializer: AnnouncementsSerializer
      end

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
          render json: @announcement, serializer: AnnouncementsSerializer
        else
          render json: { 'errors': @announcement.errors }
        end
      end

      def destroy
        @announcement.destroy

        render json: 'ok'
      end

      def send_announcement
        if @announcement.target_resource == 'telegram'
          if TelegramService.send_announcement(current_user, @announcement)
            render json: { message: 'Announcement successfully sended' }, status: :ok
          else
            render json: { message: 'Telegram not configured' }, status: :ok
          end
        else
          render json: { message: 'I can send only telegram announcements :(' }, status: :ok
        end
      end

      private

      def announcement_param_names
        %i[title date target_resource image video]
      end

      def announcement_params
        params.permit(announcement_param_names)
      end

      def set_announcement
        @announcement = Announcement.find(params[:id] || params[:announcement_id])
      end

      def set_episode
        @episode = Episode.find(params['episode_id'])
      end
    end
  end
end

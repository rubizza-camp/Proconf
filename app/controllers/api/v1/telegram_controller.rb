module Api
  module V1
    class TelegramController < ApiController
      before_action :authenticate_user

      # GET '/telegram'
      def credentials
        credentials = current_user.credentials.find_by(service: 'telegram')&.data
        render json: {
          telegram_chat_id: credentials['telegram_chat_id'] ||= '',
          telegram_token: credentials['telegram_token'] ||= ''
        }, status: :ok
      end

      # POST '/telegram'
      def telegram
        telegram = TelegramService.new(current_user, params)
        if telegram.execute
          render json: { message: 'Message sucessfully send!' }, status: :ok
        else
          render json: { error: telegram.error }, status: :ok
        end
      end
    end
  end
end

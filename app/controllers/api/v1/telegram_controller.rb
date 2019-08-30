module Api
  module V1
    class TelegramController < Api::V1::ApiController
      before_action :authenticate_user

      def telegram
        if TelegramService.new(current_user, params).execute
          render json: 'Telegram successfully created'
        else
          render json: 'Telegram not created'
        end
      end
    end
  end
end

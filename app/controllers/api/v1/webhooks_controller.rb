module Api
  module V1
    class WebhooksController < Api::V1::ApiController
      before_action :authenticate_user, only: %i[create users_boards]
      ADD_LABEL_TYPE = 'addLabelToCard'.freeze

      def complete
        head :ok
      end

      def receive
        webhook_data = WebhookParser.new(request.body.read).execute

        if webhook_data[:action_type] == ADD_LABEL_TYPE
          Episode.find_by(status: 'online').timecodes.create(
            title: webhook_data[:card_title],
            time: webhook_data[:action_date]
          )
        end

        head :ok
      end

      def create
        url = "https://api.trello.com/1/tokens/#{users_trello_creds[:oauth_token]}/webhooks"
        body = {
          key: ENV['PROCONF_APIKEY'],
          callbackURL: [ENV['CALLBACK_URL'], '/webhooks/receive'].join,
          idModel: params[:idModel]
        }

        response = HTTParty.post(url, body: body)

        render json: { "webhook": response }
      end

      def users_boards
        lists = TrelloService.new(users_trello_creds[:uid], users_trello_creds[:oauth_token]).user_boards

        render json: lists
      end

      private

      def users_trello_creds
        trello_credentials = current_user.credentials.find_by(service: 'trello')&.data
        {
          uid: trello_credentials['uid'],
          oauth_token: trelo_credentials['oauth_token']
        }
      end
    end
  end
end

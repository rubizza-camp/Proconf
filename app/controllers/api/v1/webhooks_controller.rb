module Api
  module V1
    class WebhooksController < ApiController
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

      # rubocop:disable all
      def delete
        url = "https://api.trello.com/1/webhooks/#{users_trello_creds[:webhook_id]}"
        body = {
          key: ENV['PROCONF_APIKEY'],
          token: users_trello_creds[:oauth_token]
        }

        response = HTTParty.delete(url, body: body)

        if response['_value'].nil?
          credentials.update(data: {
                               webhook_id: nil,
                               uid: users_trello_creds[:uid],
                               oauth_token: users_trello_creds[:oauth_token],
                               oauth_secret: users_trello_creds[:oauth_secret]
                             })
          render json: 'ok'
        else
          render json: 'ERROR'
        end
      end

      def create
        url = "https://api.trello.com/1/tokens/#{users_trello_creds[:oauth_token]}/webhooks"
        body = {
          key: ENV['PROCONF_APIKEY'],
          callbackURL: [ENV['CALLBACK_URL'], '/webhooks/receive'].join,
          idModel: params[:idModel]
        }

        response = HTTParty.post(url, body: body)

        unless response['error']
          credentials.update(data: {
                               webhook_id: response['id'],
                               uid: users_trello_creds[:uid],
                               oauth_token: users_trello_creds[:oauth_token],
                               oauth_secret: users_trello_creds[:oauth_secret]
                             })
        end

        render json: { "webhook": response }
      end
      # rubocop:enable all

      def users_boards
        lists = TrelloService.new(users_trello_creds[:uid], users_trello_creds[:oauth_token]).user_boards

        render json: lists
      end

      private

      def credentials
        Credential.find_or_create_by(user: current_user, service: 'trello')
      end

      def users_trello_creds
        trello_credentials = current_user.credentials.find_by(service: 'trello')&.data
        {
          uid: trello_credentials['uid'],
          oauth_token: trello_credentials['oauth_token'],
          oauth_secret: trello_credentials['oauth_secret'],
          webhook_id: trello_credentials['webhook_id']
        }
      end
    end
  end
end

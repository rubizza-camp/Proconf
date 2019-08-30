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

      # rubocop:disable Metrics/MethodLength
      def users_boards
        url = "https://api.trello.com/1/members/#{users_trello_creds[:uid]}"\
        "/boards?key=#{ENV['PROCONF_APIKEY']}"\
        "&token=#{users_trello_creds[:oauth_token]}"

        response = HTTParty.get(url)

        boards = response.map do |board|
          {
            board_name: board['name'],
            idModel: board['id']
          }
        end

        render json: boards
      end
      # rubocop:enable Metrics/MethodLength

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

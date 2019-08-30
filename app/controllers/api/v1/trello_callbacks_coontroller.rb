module Api
  module V1
    class TrelloCallbacksController < Api::V1::ApiController
      before_action :authenticate_user

      # rubocop:disable Metrics/AbcSize
      def trello
        credentials.update(data: {
                             uid: request.env['omniauth.auth'].uid,
                             oauth_token: request.env['omniauth.auth'].credentials.token,
                             oauth_secret: request.env['omniauth.auth'].credentials.secret
                           })
      end
      # rubocop:enable Metrics/AbcSize

      def credentials
        Credential.find_or_create_by(user: current_user, service: 'trello')
      end
    end
  end
end

class TrelloCallbacksController < ApplicationController
  before_action :authenticate_user!

  def trello
    Credential
      .find_or_create_by(user: current_user, service: 'trello')
      .update(data: {
                trello_oauth_token: request.env['omniauth.auth'].credentials.token,
                trello_oauth_secret: request.env['omniauth.auth'].credentials.secret
              })
    redirect_to admin_path
  end
end

class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @credentials = current_user.credentials
  end

  def telegram
    if TelegramService.new(params, current_user).execute
      redirect_to admin_path, notice: 'Telegram successfully created'
    else
      redirect_to admin_path, notice: 'Telegram not created'
    end
  end
end

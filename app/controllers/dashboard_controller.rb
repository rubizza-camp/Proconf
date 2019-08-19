class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index; end

  def telegram
    if TelegramService.new(current_user, params).execute
      redirect_to admin_path, notice: 'Telegram successfully created'
    else
      redirect_to admin_path, notice: 'Telegram not created'
    end
  end
end

class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def complete
    head :ok
  end

  def receive
    parse_webhook
    if @action_type == 'addLabelToCard'
      t_code = Timecode.new(
        episode_id: Episode.find_by(status: 'online'),
        title: @action_title,
        time: @action_date
      )
      t_code.save
    end

    head :ok
  end
end

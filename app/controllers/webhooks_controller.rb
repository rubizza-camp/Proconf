class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def complete
    return head :ok
  end

  def receive
    webhook_info = JSON.parse(request.body.read)
    action_title = webhook_info['action']['data']['card']['name']
    action_type = webhook_info['action']['type']
    action_date = webhook_info['action']['date']

    if action_type == 'addLabelToCard'
      t_code = Timecode.new(
          episode_id: Episode.find_by(status: 'online'),
          title: action_title,
          time: action_date
      )
      t_code.save
    end

    puts "\n\n\n\n\n\n" + [ action_title, action_type, action_date ].join("\n") + "\n\n\n\n\n\n"

    return head :ok
  end
end

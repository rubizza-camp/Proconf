require 'rails_helper'

RSpec.describe WebhooksController, type: :controller do
  describe "Webhooks" do
	  let(:trello_webhook)do
	   {
	  		'action':{
	  			'data':{
	  				'card':{
	  					'name': 'ProConf_Card'
	  				}
	  			},
	  			'type': 'addLabelToCard',
	  			'date': '2013-07-31T16:58:51.949Z'
		  	}
	    }
    end

	  it 'returns 200 header to trello' do
	    get :complete
      expect(response).to have_http_status(200)
    end

    it 'filters webhook request and save timecode to episode which is online' do
      Episode.last.update(status: 'online')
      post :receive, body: trello_webhook.to_json
      expect(Episode.find_by(status: 'online').timecodes.last.title).to eq(trello_webhook[:action][:data][:card][:name])
    end
  end
end

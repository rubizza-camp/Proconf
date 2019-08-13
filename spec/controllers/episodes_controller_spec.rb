require 'rails_helper'

RSpec.describe EpisodesController, type: :controller do
  let(:episode) { create(:episode) }

  it '#index' do
    get :index
    expect(response).to have_http_status :ok
    expect(response).to render_template(:index)
  end

  it '#show' do
    get :show, params: { id: episode.id }
    expect(response).to have_http_status :ok
    expect(response).to render_template(:show)
    expect(assigns(:episode)).to eq(episode)
  end
end

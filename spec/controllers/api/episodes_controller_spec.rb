require 'rails_helper'

RSpec.describe Api::V1::EpisodesController, type: :controller do
  it 'retrieves all episodes' do
    FactoryBot.create_list(:episode, 10)
    get :index
    json = JSON.parse(response.body)
    
    expect(response).to have_http_status(:success)
    expect(json.size).to eq(10)
  end

  it 'retrieves specific episode' do
    episode = FactoryBot.create(:episode)
    get :show, params: { id: episode.id }
    json = JSON.parse(response.body)
    
    expect(response).to have_http_status(:success)
    expect(json['id']).to eq(episode.id)
    expect(json['title']).to eq(episode.title)
    expect(DateTime.parse(json['date']).utc.to_s).to eq(episode.date.utc.to_s)
  end

  it 'creates new episode' do
    episode_date = Time.now
    video_id = 'IAO5bPs0x58'
    post :create, params: { title: 'test_title', date: episode_date, :video => "https://www.youtube.com/watch?v=#{video_id}" }
    json = JSON.parse(response.body)
    
    expect(response).to have_http_status(:success)
    expect(json['title']).to eq('test_title')
    expect(DateTime.parse(json['date']).utc.to_s).to eq(episode_date.utc.to_s)
    expect(json['video']).to eq(video_id)
  end
end

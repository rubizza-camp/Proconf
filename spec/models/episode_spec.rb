require 'rails_helper'

RSpec.describe Episode, type: :model do
  context 'with valid params' do
    let(:valid_episode) { described_class.new(title: 'Name', date: Time.now) }

    it { expect(valid_episode).to be_valid }
  end

  context 'with invalid params' do
    let(:episode_withoul_title) { described_class.new(date: Time.now) }
    let(:episode_withoul_date) { described_class.new(title: 'Title') }

    it { expect(episode_withoul_title).to be_invalid }

    it { expect(episode_withoul_date).to be_invalid }
  end
end

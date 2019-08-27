require 'rails_helper'

RSpec.describe Sponsor, type: :model do
  SPONSOR_VALID_PARAMS = { name: 'Name'}.freeze
  SPONSOR_INVALID_PARAMS_NO_NAME = { name: '' }.freeze

  context 'with valid params' do
    let(:valid_sponsor) { described_class.new(SPONSOR_VALID_PARAMS) }

    it { expect(valid_sponsor).to be_valid }
  end

  context 'with invalid params' do
    let(:sponsor_without_name) { described_class.new(SPONSOR_INVALID_PARAMS_NO_NAME) }

    it { expect(sponsor_without_name).to be_invalid }
  end
end
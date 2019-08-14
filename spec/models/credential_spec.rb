require 'rails_helper'

RSpec.describe Credential, type: :model do
  context 'with valid params' do
    let(:valid_credential) { build :credential }

    it { expect(valid_credential).to be_valid }
  end

  context 'with invalid params' do
    let(:invalid_credential) { build :credential, service: nil }

    it { expect(invalid_credential).to be_invalid }
  end
end

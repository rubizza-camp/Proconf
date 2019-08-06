require 'rails_helper'

RSpec.describe Role, type: :model do
  context 'with valid params' do
    let(:valid_role) { described_class.new(name: 'admin') }

    it { expect(valid_role).to be_valid }
  end

  context 'with invalid params' do
    let(:role_withoul_name) { described_class.new }

    it { expect(role_withoul_name).to be_invalid }
  end
end

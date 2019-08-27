import { Transfer } from 'antd';
import AntTransfer from './styles/transfer.style';
import WithDirection from '../../Library/withDirection';

const WDTransfers = AntTransfer(Transfer);
const Transfers = WithDirection(WDTransfers);

export default Transfers;

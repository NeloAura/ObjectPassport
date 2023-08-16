//using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const projectId = '2PwwTsoqoTAXBNp8XoLupsySy45';
const projectSecret = '3a081a260f5a5895ecdf9b64e5a6b2cc';
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

ipfs.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
  console.log(res);
});

export default ipfs;
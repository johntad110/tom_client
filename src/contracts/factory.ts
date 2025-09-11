import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    type ContractProvider,
    type Sender,
    type Contract,
    type ContractABI,
    type ABIType,
    type ABIGetter,
    type ABIReceiver,
    TupleBuilder,
    type DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type CreateMarket = {
    $$type: 'CreateMarket';
    question: string;
    clarification: string;
    closeTimestamp: bigint;
    oracleAddr: Address;
    feeBps: bigint;
    initialLiquidity: bigint;
    initialProbability: bigint;
    creator: Address | null;
    createdBy: string | null;
    askedBy: string | null;
    bannerImage: string | null;
}

export function storeCreateMarket(src: CreateMarket) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1209219046, 32);
        b_0.storeStringRefTail(src.question);
        b_0.storeStringRefTail(src.clarification);
        b_0.storeUint(src.closeTimestamp, 64);
        b_0.storeAddress(src.oracleAddr);
        b_0.storeUint(src.feeBps, 16);
        b_0.storeCoins(src.initialLiquidity);
        b_0.storeUint(src.initialProbability, 8);
        b_0.storeAddress(src.creator);
        const b_1 = new Builder();
        if (src.createdBy !== null && src.createdBy !== undefined) { b_1.storeBit(true).storeStringRefTail(src.createdBy); } else { b_1.storeBit(false); }
        if (src.askedBy !== null && src.askedBy !== undefined) { b_1.storeBit(true).storeStringRefTail(src.askedBy); } else { b_1.storeBit(false); }
        if (src.bannerImage !== null && src.bannerImage !== undefined) { b_1.storeBit(true).storeStringRefTail(src.bannerImage); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateMarket(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1209219046) { throw Error('Invalid prefix'); }
    const _question = sc_0.loadStringRefTail();
    const _clarification = sc_0.loadStringRefTail();
    const _closeTimestamp = sc_0.loadUintBig(64);
    const _oracleAddr = sc_0.loadAddress();
    const _feeBps = sc_0.loadUintBig(16);
    const _initialLiquidity = sc_0.loadCoins();
    const _initialProbability = sc_0.loadUintBig(8);
    const _creator = sc_0.loadMaybeAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _createdBy = sc_1.loadBit() ? sc_1.loadStringRefTail() : null;
    const _askedBy = sc_1.loadBit() ? sc_1.loadStringRefTail() : null;
    const _bannerImage = sc_1.loadBit() ? sc_1.loadStringRefTail() : null;
    return { $$type: 'CreateMarket' as const, question: _question, clarification: _clarification, closeTimestamp: _closeTimestamp, oracleAddr: _oracleAddr, feeBps: _feeBps, initialLiquidity: _initialLiquidity, initialProbability: _initialProbability, creator: _creator, createdBy: _createdBy, askedBy: _askedBy, bannerImage: _bannerImage };
}

export function loadTupleCreateMarket(source: TupleReader) {
    const _question = source.readString();
    const _clarification = source.readString();
    const _closeTimestamp = source.readBigNumber();
    const _oracleAddr = source.readAddress();
    const _feeBps = source.readBigNumber();
    const _initialLiquidity = source.readBigNumber();
    const _initialProbability = source.readBigNumber();
    const _creator = source.readAddressOpt();
    const _createdBy = source.readStringOpt();
    const _askedBy = source.readStringOpt();
    const _bannerImage = source.readStringOpt();
    return { $$type: 'CreateMarket' as const, question: _question, clarification: _clarification, closeTimestamp: _closeTimestamp, oracleAddr: _oracleAddr, feeBps: _feeBps, initialLiquidity: _initialLiquidity, initialProbability: _initialProbability, creator: _creator, createdBy: _createdBy, askedBy: _askedBy, bannerImage: _bannerImage };
}

export function loadGetterTupleCreateMarket(source: TupleReader) {
    const _question = source.readString();
    const _clarification = source.readString();
    const _closeTimestamp = source.readBigNumber();
    const _oracleAddr = source.readAddress();
    const _feeBps = source.readBigNumber();
    const _initialLiquidity = source.readBigNumber();
    const _initialProbability = source.readBigNumber();
    const _creator = source.readAddressOpt();
    const _createdBy = source.readStringOpt();
    const _askedBy = source.readStringOpt();
    const _bannerImage = source.readStringOpt();
    return { $$type: 'CreateMarket' as const, question: _question, clarification: _clarification, closeTimestamp: _closeTimestamp, oracleAddr: _oracleAddr, feeBps: _feeBps, initialLiquidity: _initialLiquidity, initialProbability: _initialProbability, creator: _creator, createdBy: _createdBy, askedBy: _askedBy, bannerImage: _bannerImage };
}

export function storeTupleCreateMarket(source: CreateMarket) {
    const builder = new TupleBuilder();
    builder.writeString(source.question);
    builder.writeString(source.clarification);
    builder.writeNumber(source.closeTimestamp);
    builder.writeAddress(source.oracleAddr);
    builder.writeNumber(source.feeBps);
    builder.writeNumber(source.initialLiquidity);
    builder.writeNumber(source.initialProbability);
    builder.writeAddress(source.creator);
    builder.writeString(source.createdBy);
    builder.writeString(source.askedBy);
    builder.writeString(source.bannerImage);
    return builder.build();
}

export function dictValueParserCreateMarket(): DictionaryValue<CreateMarket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateMarket(src)).endCell());
        },
        parse: (src) => {
            return loadCreateMarket(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(195467089, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 195467089) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

export function loadTupleWithdraw(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

export function loadGetterTupleWithdraw(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

export function storeTupleWithdraw(source: Withdraw) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type BuyYes = {
    $$type: 'BuyYes';
    amount: bigint;
}

export function storeBuyYes(src: BuyYes) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(376730235, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadBuyYes(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 376730235) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    return { $$type: 'BuyYes' as const, amount: _amount };
}

export function loadTupleBuyYes(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'BuyYes' as const, amount: _amount };
}

export function loadGetterTupleBuyYes(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'BuyYes' as const, amount: _amount };
}

export function storeTupleBuyYes(source: BuyYes) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserBuyYes(): DictionaryValue<BuyYes> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyYes(src)).endCell());
        },
        parse: (src) => {
            return loadBuyYes(src.loadRef().beginParse());
        }
    }
}

export type BuyNo = {
    $$type: 'BuyNo';
    amount: bigint;
}

export function storeBuyNo(src: BuyNo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1298698608, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadBuyNo(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1298698608) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    return { $$type: 'BuyNo' as const, amount: _amount };
}

export function loadTupleBuyNo(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'BuyNo' as const, amount: _amount };
}

export function loadGetterTupleBuyNo(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'BuyNo' as const, amount: _amount };
}

export function storeTupleBuyNo(source: BuyNo) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserBuyNo(): DictionaryValue<BuyNo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyNo(src)).endCell());
        },
        parse: (src) => {
            return loadBuyNo(src.loadRef().beginParse());
        }
    }
}

export type SellYes = {
    $$type: 'SellYes';
    amount: bigint;
}

export function storeSellYes(src: SellYes) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2058034007, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadSellYes(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2058034007) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    return { $$type: 'SellYes' as const, amount: _amount };
}

export function loadTupleSellYes(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'SellYes' as const, amount: _amount };
}

export function loadGetterTupleSellYes(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'SellYes' as const, amount: _amount };
}

export function storeTupleSellYes(source: SellYes) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserSellYes(): DictionaryValue<SellYes> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSellYes(src)).endCell());
        },
        parse: (src) => {
            return loadSellYes(src.loadRef().beginParse());
        }
    }
}

export type SellNo = {
    $$type: 'SellNo';
    amount: bigint;
}

export function storeSellNo(src: SellNo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(515690717, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadSellNo(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 515690717) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    return { $$type: 'SellNo' as const, amount: _amount };
}

export function loadTupleSellNo(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'SellNo' as const, amount: _amount };
}

export function loadGetterTupleSellNo(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'SellNo' as const, amount: _amount };
}

export function storeTupleSellNo(source: SellNo) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserSellNo(): DictionaryValue<SellNo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSellNo(src)).endCell());
        },
        parse: (src) => {
            return loadSellNo(src.loadRef().beginParse());
        }
    }
}

export type Resolve = {
    $$type: 'Resolve';
    outcome: boolean;
}

export function storeResolve(src: Resolve) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4014108989, 32);
        b_0.storeBit(src.outcome);
    };
}

export function loadResolve(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4014108989) { throw Error('Invalid prefix'); }
    const _outcome = sc_0.loadBit();
    return { $$type: 'Resolve' as const, outcome: _outcome };
}

export function loadTupleResolve(source: TupleReader) {
    const _outcome = source.readBoolean();
    return { $$type: 'Resolve' as const, outcome: _outcome };
}

export function loadGetterTupleResolve(source: TupleReader) {
    const _outcome = source.readBoolean();
    return { $$type: 'Resolve' as const, outcome: _outcome };
}

export function storeTupleResolve(source: Resolve) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.outcome);
    return builder.build();
}

export function dictValueParserResolve(): DictionaryValue<Resolve> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResolve(src)).endCell());
        },
        parse: (src) => {
            return loadResolve(src.loadRef().beginParse());
        }
    }
}

export type Redeem = {
    $$type: 'Redeem';
    addr: Address;
}

export function storeRedeem(src: Redeem) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3473475906, 32);
        b_0.storeAddress(src.addr);
    };
}

export function loadRedeem(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3473475906) { throw Error('Invalid prefix'); }
    const _addr = sc_0.loadAddress();
    return { $$type: 'Redeem' as const, addr: _addr };
}

export function loadTupleRedeem(source: TupleReader) {
    const _addr = source.readAddress();
    return { $$type: 'Redeem' as const, addr: _addr };
}

export function loadGetterTupleRedeem(source: TupleReader) {
    const _addr = source.readAddress();
    return { $$type: 'Redeem' as const, addr: _addr };
}

export function storeTupleRedeem(source: Redeem) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.addr);
    return builder.build();
}

export function dictValueParserRedeem(): DictionaryValue<Redeem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRedeem(src)).endCell());
        },
        parse: (src) => {
            return loadRedeem(src.loadRef().beginParse());
        }
    }
}

export type EditMarketDetails = {
    $$type: 'EditMarketDetails';
    field: string;
    newValue: string;
    reason: string;
}

export function storeEditMarketDetails(src: EditMarketDetails) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2390919679, 32);
        b_0.storeStringRefTail(src.field);
        b_0.storeStringRefTail(src.newValue);
        b_0.storeStringRefTail(src.reason);
    };
}

export function loadEditMarketDetails(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2390919679) { throw Error('Invalid prefix'); }
    const _field = sc_0.loadStringRefTail();
    const _newValue = sc_0.loadStringRefTail();
    const _reason = sc_0.loadStringRefTail();
    return { $$type: 'EditMarketDetails' as const, field: _field, newValue: _newValue, reason: _reason };
}

export function loadTupleEditMarketDetails(source: TupleReader) {
    const _field = source.readString();
    const _newValue = source.readString();
    const _reason = source.readString();
    return { $$type: 'EditMarketDetails' as const, field: _field, newValue: _newValue, reason: _reason };
}

export function loadGetterTupleEditMarketDetails(source: TupleReader) {
    const _field = source.readString();
    const _newValue = source.readString();
    const _reason = source.readString();
    return { $$type: 'EditMarketDetails' as const, field: _field, newValue: _newValue, reason: _reason };
}

export function storeTupleEditMarketDetails(source: EditMarketDetails) {
    const builder = new TupleBuilder();
    builder.writeString(source.field);
    builder.writeString(source.newValue);
    builder.writeString(source.reason);
    return builder.build();
}

export function dictValueParserEditMarketDetails(): DictionaryValue<EditMarketDetails> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEditMarketDetails(src)).endCell());
        },
        parse: (src) => {
            return loadEditMarketDetails(src.loadRef().beginParse());
        }
    }
}

export type MarketState = {
    $$type: 'MarketState';
    reserveYes: bigint;
    reserveNo: bigint;
    k: bigint;
    feeBps: bigint;
    oracleAddr: Address;
    closeTimestamp: bigint;
    resolved: boolean;
    outcome: boolean | null;
    factory: Address;
    marketId: bigint;
    marketType: string;
    question: string;
    clarification: string;
    version: bigint;
    totalVolume: bigint;
    yesVolume: bigint;
    noVolume: bigint;
    creator: Address | null;
    createdBy: string | null;
    askedBy: string | null;
    bannerImage: string | null;
}

export function storeMarketState(src: MarketState) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.reserveYes);
        b_0.storeCoins(src.reserveNo);
        b_0.storeCoins(src.k);
        b_0.storeUint(src.feeBps, 16);
        b_0.storeAddress(src.oracleAddr);
        b_0.storeUint(src.closeTimestamp, 64);
        b_0.storeBit(src.resolved);
        if (src.outcome !== null && src.outcome !== undefined) { b_0.storeBit(true).storeBit(src.outcome); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.factory);
        const b_1 = new Builder();
        b_1.storeUint(src.marketId, 64);
        b_1.storeStringRefTail(src.marketType);
        b_1.storeStringRefTail(src.question);
        b_1.storeStringRefTail(src.clarification);
        b_1.storeUint(src.version, 8);
        b_1.storeInt(src.totalVolume, 257);
        b_1.storeInt(src.yesVolume, 257);
        b_1.storeInt(src.noVolume, 257);
        const b_2 = new Builder();
        b_2.storeAddress(src.creator);
        if (src.createdBy !== null && src.createdBy !== undefined) { b_2.storeBit(true).storeStringRefTail(src.createdBy); } else { b_2.storeBit(false); }
        if (src.askedBy !== null && src.askedBy !== undefined) { b_2.storeBit(true).storeStringRefTail(src.askedBy); } else { b_2.storeBit(false); }
        if (src.bannerImage !== null && src.bannerImage !== undefined) { b_2.storeBit(true).storeStringRefTail(src.bannerImage); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketState(slice: Slice) {
    const sc_0 = slice;
    const _reserveYes = sc_0.loadCoins();
    const _reserveNo = sc_0.loadCoins();
    const _k = sc_0.loadCoins();
    const _feeBps = sc_0.loadUintBig(16);
    const _oracleAddr = sc_0.loadAddress();
    const _closeTimestamp = sc_0.loadUintBig(64);
    const _resolved = sc_0.loadBit();
    const _outcome = sc_0.loadBit() ? sc_0.loadBit() : null;
    const _factory = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _marketId = sc_1.loadUintBig(64);
    const _marketType = sc_1.loadStringRefTail();
    const _question = sc_1.loadStringRefTail();
    const _clarification = sc_1.loadStringRefTail();
    const _version = sc_1.loadUintBig(8);
    const _totalVolume = sc_1.loadIntBig(257);
    const _yesVolume = sc_1.loadIntBig(257);
    const _noVolume = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _creator = sc_2.loadMaybeAddress();
    const _createdBy = sc_2.loadBit() ? sc_2.loadStringRefTail() : null;
    const _askedBy = sc_2.loadBit() ? sc_2.loadStringRefTail() : null;
    const _bannerImage = sc_2.loadBit() ? sc_2.loadStringRefTail() : null;
    return { $$type: 'MarketState' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, marketType: _marketType, question: _question, clarification: _clarification, version: _version, totalVolume: _totalVolume, yesVolume: _yesVolume, noVolume: _noVolume, creator: _creator, createdBy: _createdBy, askedBy: _askedBy, bannerImage: _bannerImage };
}

export function loadTupleMarketState(source: TupleReader) {
    const _reserveYes = source.readBigNumber();
    const _reserveNo = source.readBigNumber();
    const _k = source.readBigNumber();
    const _feeBps = source.readBigNumber();
    const _oracleAddr = source.readAddress();
    const _closeTimestamp = source.readBigNumber();
    const _resolved = source.readBoolean();
    const _outcome = source.readBooleanOpt();
    const _factory = source.readAddress();
    const _marketId = source.readBigNumber();
    const _marketType = source.readString();
    const _question = source.readString();
    const _clarification = source.readString();
    const _version = source.readBigNumber();
    source = source.readTuple();
    const _totalVolume = source.readBigNumber();
    const _yesVolume = source.readBigNumber();
    const _noVolume = source.readBigNumber();
    const _creator = source.readAddressOpt();
    const _createdBy = source.readStringOpt();
    const _askedBy = source.readStringOpt();
    const _bannerImage = source.readStringOpt();
    return { $$type: 'MarketState' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, marketType: _marketType, question: _question, clarification: _clarification, version: _version, totalVolume: _totalVolume, yesVolume: _yesVolume, noVolume: _noVolume, creator: _creator, createdBy: _createdBy, askedBy: _askedBy, bannerImage: _bannerImage };
}

export function loadGetterTupleMarketState(source: TupleReader) {
    const _reserveYes = source.readBigNumber();
    const _reserveNo = source.readBigNumber();
    const _k = source.readBigNumber();
    const _feeBps = source.readBigNumber();
    const _oracleAddr = source.readAddress();
    const _closeTimestamp = source.readBigNumber();
    const _resolved = source.readBoolean();
    const _outcome = source.readBooleanOpt();
    const _factory = source.readAddress();
    const _marketId = source.readBigNumber();
    const _marketType = source.readString();
    const _question = source.readString();
    const _clarification = source.readString();
    const _version = source.readBigNumber();
    const _totalVolume = source.readBigNumber();
    const _yesVolume = source.readBigNumber();
    const _noVolume = source.readBigNumber();
    const _creator = source.readAddressOpt();
    const _createdBy = source.readStringOpt();
    const _askedBy = source.readStringOpt();
    const _bannerImage = source.readStringOpt();
    return { $$type: 'MarketState' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, marketType: _marketType, question: _question, clarification: _clarification, version: _version, totalVolume: _totalVolume, yesVolume: _yesVolume, noVolume: _noVolume, creator: _creator, createdBy: _createdBy, askedBy: _askedBy, bannerImage: _bannerImage };
}

export function storeTupleMarketState(source: MarketState) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.reserveYes);
    builder.writeNumber(source.reserveNo);
    builder.writeNumber(source.k);
    builder.writeNumber(source.feeBps);
    builder.writeAddress(source.oracleAddr);
    builder.writeNumber(source.closeTimestamp);
    builder.writeBoolean(source.resolved);
    builder.writeBoolean(source.outcome);
    builder.writeAddress(source.factory);
    builder.writeNumber(source.marketId);
    builder.writeString(source.marketType);
    builder.writeString(source.question);
    builder.writeString(source.clarification);
    builder.writeNumber(source.version);
    builder.writeNumber(source.totalVolume);
    builder.writeNumber(source.yesVolume);
    builder.writeNumber(source.noVolume);
    builder.writeAddress(source.creator);
    builder.writeString(source.createdBy);
    builder.writeString(source.askedBy);
    builder.writeString(source.bannerImage);
    return builder.build();
}

export function dictValueParserMarketState(): DictionaryValue<MarketState> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketState(src)).endCell());
        },
        parse: (src) => {
            return loadMarketState(src.loadRef().beginParse());
        }
    }
}

export type YesNoBalances = {
    $$type: 'YesNoBalances';
    yes: bigint | null;
    no: bigint | null;
}

export function storeYesNoBalances(src: YesNoBalances) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.yes !== null && src.yes !== undefined) { b_0.storeBit(true).storeInt(src.yes, 257); } else { b_0.storeBit(false); }
        if (src.no !== null && src.no !== undefined) { b_0.storeBit(true).storeInt(src.no, 257); } else { b_0.storeBit(false); }
    };
}

export function loadYesNoBalances(slice: Slice) {
    const sc_0 = slice;
    const _yes = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _no = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'YesNoBalances' as const, yes: _yes, no: _no };
}

export function loadTupleYesNoBalances(source: TupleReader) {
    const _yes = source.readBigNumberOpt();
    const _no = source.readBigNumberOpt();
    return { $$type: 'YesNoBalances' as const, yes: _yes, no: _no };
}

export function loadGetterTupleYesNoBalances(source: TupleReader) {
    const _yes = source.readBigNumberOpt();
    const _no = source.readBigNumberOpt();
    return { $$type: 'YesNoBalances' as const, yes: _yes, no: _no };
}

export function storeTupleYesNoBalances(source: YesNoBalances) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.yes);
    builder.writeNumber(source.no);
    return builder.build();
}

export function dictValueParserYesNoBalances(): DictionaryValue<YesNoBalances> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeYesNoBalances(src)).endCell());
        },
        parse: (src) => {
            return loadYesNoBalances(src.loadRef().beginParse());
        }
    }
}

export type Probabilities = {
    $$type: 'Probabilities';
    yes: bigint;
    no: bigint;
}

export function storeProbabilities(src: Probabilities) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.yes, 257);
        b_0.storeInt(src.no, 257);
    };
}

export function loadProbabilities(slice: Slice) {
    const sc_0 = slice;
    const _yes = sc_0.loadIntBig(257);
    const _no = sc_0.loadIntBig(257);
    return { $$type: 'Probabilities' as const, yes: _yes, no: _no };
}

export function loadTupleProbabilities(source: TupleReader) {
    const _yes = source.readBigNumber();
    const _no = source.readBigNumber();
    return { $$type: 'Probabilities' as const, yes: _yes, no: _no };
}

export function loadGetterTupleProbabilities(source: TupleReader) {
    const _yes = source.readBigNumber();
    const _no = source.readBigNumber();
    return { $$type: 'Probabilities' as const, yes: _yes, no: _no };
}

export function storeTupleProbabilities(source: Probabilities) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.yes);
    builder.writeNumber(source.no);
    return builder.build();
}

export function dictValueParserProbabilities(): DictionaryValue<Probabilities> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProbabilities(src)).endCell());
        },
        parse: (src) => {
            return loadProbabilities(src.loadRef().beginParse());
        }
    }
}

export type MarketVolume = {
    $$type: 'MarketVolume';
    totalVolume: bigint;
    yesVolume: bigint;
    noVolume: bigint;
}

export function storeMarketVolume(src: MarketVolume) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalVolume, 257);
        b_0.storeInt(src.yesVolume, 257);
        b_0.storeInt(src.noVolume, 257);
    };
}

export function loadMarketVolume(slice: Slice) {
    const sc_0 = slice;
    const _totalVolume = sc_0.loadIntBig(257);
    const _yesVolume = sc_0.loadIntBig(257);
    const _noVolume = sc_0.loadIntBig(257);
    return { $$type: 'MarketVolume' as const, totalVolume: _totalVolume, yesVolume: _yesVolume, noVolume: _noVolume };
}

export function loadTupleMarketVolume(source: TupleReader) {
    const _totalVolume = source.readBigNumber();
    const _yesVolume = source.readBigNumber();
    const _noVolume = source.readBigNumber();
    return { $$type: 'MarketVolume' as const, totalVolume: _totalVolume, yesVolume: _yesVolume, noVolume: _noVolume };
}

export function loadGetterTupleMarketVolume(source: TupleReader) {
    const _totalVolume = source.readBigNumber();
    const _yesVolume = source.readBigNumber();
    const _noVolume = source.readBigNumber();
    return { $$type: 'MarketVolume' as const, totalVolume: _totalVolume, yesVolume: _yesVolume, noVolume: _noVolume };
}

export function storeTupleMarketVolume(source: MarketVolume) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalVolume);
    builder.writeNumber(source.yesVolume);
    builder.writeNumber(source.noVolume);
    return builder.build();
}

export function dictValueParserMarketVolume(): DictionaryValue<MarketVolume> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketVolume(src)).endCell());
        },
        parse: (src) => {
            return loadMarketVolume(src.loadRef().beginParse());
        }
    }
}

export type BinaryMarket$Data = {
    $$type: 'BinaryMarket$Data';
    reserveYes: bigint;
    reserveNo: bigint;
    k: bigint;
    feeBps: bigint;
    collectedFees: bigint;
    oracleAddr: Address;
    closeTimestamp: bigint;
    resolved: boolean;
    outcome: boolean | null;
    factory: Address;
    marketId: bigint;
    marketType: string;
    question: string;
    clarification: string;
    version: bigint;
    editHistory: Dictionary<number, EditLog>;
    creator: Address | null;
    createdBy: string | null;
    askedBy: string | null;
    bannerImage: string | null;
    lastActive: bigint | null;
    yesBalances: Dictionary<Address, bigint>;
    noBalances: Dictionary<Address, bigint>;
    winningTotalSupply: bigint;
    winningPayoutPool: bigint;
    totalVolume: bigint;
    yesVolume: bigint;
    noVolume: bigint;
    nextActionId: bigint;
    marketHistory: Dictionary<bigint, MarketHistory>;
}

export function storeBinaryMarket$Data(src: BinaryMarket$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.reserveYes);
        b_0.storeCoins(src.reserveNo);
        b_0.storeCoins(src.k);
        b_0.storeUint(src.feeBps, 16);
        b_0.storeInt(src.collectedFees, 257);
        b_0.storeAddress(src.oracleAddr);
        b_0.storeUint(src.closeTimestamp, 64);
        b_0.storeBit(src.resolved);
        if (src.outcome !== null && src.outcome !== undefined) { b_0.storeBit(true).storeBit(src.outcome); } else { b_0.storeBit(false); }
        const b_1 = new Builder();
        b_1.storeAddress(src.factory);
        b_1.storeUint(src.marketId, 64);
        b_1.storeStringRefTail(src.marketType);
        b_1.storeStringRefTail(src.question);
        b_1.storeStringRefTail(src.clarification);
        b_1.storeInt(src.version, 257);
        const b_2 = new Builder();
        b_2.storeDict(src.editHistory, Dictionary.Keys.Uint(8), dictValueParserEditLog());
        b_2.storeAddress(src.creator);
        if (src.createdBy !== null && src.createdBy !== undefined) { b_2.storeBit(true).storeStringRefTail(src.createdBy); } else { b_2.storeBit(false); }
        if (src.askedBy !== null && src.askedBy !== undefined) { b_2.storeBit(true).storeStringRefTail(src.askedBy); } else { b_2.storeBit(false); }
        const b_3 = new Builder();
        if (src.bannerImage !== null && src.bannerImage !== undefined) { b_3.storeBit(true).storeStringRefTail(src.bannerImage); } else { b_3.storeBit(false); }
        if (src.lastActive !== null && src.lastActive !== undefined) { b_3.storeBit(true).storeInt(src.lastActive, 257); } else { b_3.storeBit(false); }
        b_3.storeDict(src.yesBalances, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_3.storeDict(src.noBalances, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_3.storeUint(src.winningTotalSupply, 64);
        b_3.storeUint(src.winningPayoutPool, 64);
        b_3.storeInt(src.totalVolume, 257);
        b_3.storeInt(src.yesVolume, 257);
        const b_4 = new Builder();
        b_4.storeInt(src.noVolume, 257);
        b_4.storeInt(src.nextActionId, 257);
        b_4.storeDict(src.marketHistory, Dictionary.Keys.BigInt(257), dictValueParserMarketHistory());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBinaryMarket$Data(slice: Slice) {
    const sc_0 = slice;
    const _reserveYes = sc_0.loadCoins();
    const _reserveNo = sc_0.loadCoins();
    const _k = sc_0.loadCoins();
    const _feeBps = sc_0.loadUintBig(16);
    const _collectedFees = sc_0.loadIntBig(257);
    const _oracleAddr = sc_0.loadAddress();
    const _closeTimestamp = sc_0.loadUintBig(64);
    const _resolved = sc_0.loadBit();
    const _outcome = sc_0.loadBit() ? sc_0.loadBit() : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _factory = sc_1.loadAddress();
    const _marketId = sc_1.loadUintBig(64);
    const _marketType = sc_1.loadStringRefTail();
    const _question = sc_1.loadStringRefTail();
    const _clarification = sc_1.loadStringRefTail();
    const _version = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _editHistory = Dictionary.load(Dictionary.Keys.Uint(8), dictValueParserEditLog(), sc_2);
    const _creator = sc_2.loadMaybeAddress();
    const _createdBy = sc_2.loadBit() ? sc_2.loadStringRefTail() : null;
    const _askedBy = sc_2.loadBit() ? sc_2.loadStringRefTail() : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _bannerImage = sc_3.loadBit() ? sc_3.loadStringRefTail() : null;
    const _lastActive = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _yesBalances = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_3);
    const _noBalances = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_3);
    const _winningTotalSupply = sc_3.loadUintBig(64);
    const _winningPayoutPool = sc_3.loadUintBig(64);
    const _totalVolume = sc_3.loadIntBig(257);
    const _yesVolume = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _noVolume = sc_4.loadIntBig(257);
    const _nextActionId = sc_4.loadIntBig(257);
    const _marketHistory = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserMarketHistory(), sc_4);
    return { $$type: 'BinaryMarket$Data' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, collectedFees: _collectedFees, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, marketType: _marketType, question: _question, clarification: _clarification, version: _version, editHistory: _editHistory, creator: _creator, createdBy: _createdBy, askedBy: _askedBy, bannerImage: _bannerImage, lastActive: _lastActive, yesBalances: _yesBalances, noBalances: _noBalances, winningTotalSupply: _winningTotalSupply, winningPayoutPool: _winningPayoutPool, totalVolume: _totalVolume, yesVolume: _yesVolume, noVolume: _noVolume, nextActionId: _nextActionId, marketHistory: _marketHistory };
}

export function loadTupleBinaryMarket$Data(source: TupleReader) {
    const _reserveYes = source.readBigNumber();
    const _reserveNo = source.readBigNumber();
    const _k = source.readBigNumber();
    const _feeBps = source.readBigNumber();
    const _collectedFees = source.readBigNumber();
    const _oracleAddr = source.readAddress();
    const _closeTimestamp = source.readBigNumber();
    const _resolved = source.readBoolean();
    const _outcome = source.readBooleanOpt();
    const _factory = source.readAddress();
    const _marketId = source.readBigNumber();
    const _marketType = source.readString();
    const _question = source.readString();
    const _clarification = source.readString();
    source = source.readTuple();
    const _version = source.readBigNumber();
    const _editHistory = Dictionary.loadDirect(Dictionary.Keys.Uint(8), dictValueParserEditLog(), source.readCellOpt());
    const _creator = source.readAddressOpt();
    const _createdBy = source.readStringOpt();
    const _askedBy = source.readStringOpt();
    const _bannerImage = source.readStringOpt();
    const _lastActive = source.readBigNumberOpt();
    const _yesBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _noBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _winningTotalSupply = source.readBigNumber();
    const _winningPayoutPool = source.readBigNumber();
    const _totalVolume = source.readBigNumber();
    const _yesVolume = source.readBigNumber();
    const _noVolume = source.readBigNumber();
    source = source.readTuple();
    const _nextActionId = source.readBigNumber();
    const _marketHistory = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserMarketHistory(), source.readCellOpt());
    return { $$type: 'BinaryMarket$Data' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, collectedFees: _collectedFees, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, marketType: _marketType, question: _question, clarification: _clarification, version: _version, editHistory: _editHistory, creator: _creator, createdBy: _createdBy, askedBy: _askedBy, bannerImage: _bannerImage, lastActive: _lastActive, yesBalances: _yesBalances, noBalances: _noBalances, winningTotalSupply: _winningTotalSupply, winningPayoutPool: _winningPayoutPool, totalVolume: _totalVolume, yesVolume: _yesVolume, noVolume: _noVolume, nextActionId: _nextActionId, marketHistory: _marketHistory };
}

export function loadGetterTupleBinaryMarket$Data(source: TupleReader) {
    const _reserveYes = source.readBigNumber();
    const _reserveNo = source.readBigNumber();
    const _k = source.readBigNumber();
    const _feeBps = source.readBigNumber();
    const _collectedFees = source.readBigNumber();
    const _oracleAddr = source.readAddress();
    const _closeTimestamp = source.readBigNumber();
    const _resolved = source.readBoolean();
    const _outcome = source.readBooleanOpt();
    const _factory = source.readAddress();
    const _marketId = source.readBigNumber();
    const _marketType = source.readString();
    const _question = source.readString();
    const _clarification = source.readString();
    const _version = source.readBigNumber();
    const _editHistory = Dictionary.loadDirect(Dictionary.Keys.Uint(8), dictValueParserEditLog(), source.readCellOpt());
    const _creator = source.readAddressOpt();
    const _createdBy = source.readStringOpt();
    const _askedBy = source.readStringOpt();
    const _bannerImage = source.readStringOpt();
    const _lastActive = source.readBigNumberOpt();
    const _yesBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _noBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _winningTotalSupply = source.readBigNumber();
    const _winningPayoutPool = source.readBigNumber();
    const _totalVolume = source.readBigNumber();
    const _yesVolume = source.readBigNumber();
    const _noVolume = source.readBigNumber();
    const _nextActionId = source.readBigNumber();
    const _marketHistory = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserMarketHistory(), source.readCellOpt());
    return { $$type: 'BinaryMarket$Data' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, collectedFees: _collectedFees, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, marketType: _marketType, question: _question, clarification: _clarification, version: _version, editHistory: _editHistory, creator: _creator, createdBy: _createdBy, askedBy: _askedBy, bannerImage: _bannerImage, lastActive: _lastActive, yesBalances: _yesBalances, noBalances: _noBalances, winningTotalSupply: _winningTotalSupply, winningPayoutPool: _winningPayoutPool, totalVolume: _totalVolume, yesVolume: _yesVolume, noVolume: _noVolume, nextActionId: _nextActionId, marketHistory: _marketHistory };
}

export function storeTupleBinaryMarket$Data(source: BinaryMarket$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.reserveYes);
    builder.writeNumber(source.reserveNo);
    builder.writeNumber(source.k);
    builder.writeNumber(source.feeBps);
    builder.writeNumber(source.collectedFees);
    builder.writeAddress(source.oracleAddr);
    builder.writeNumber(source.closeTimestamp);
    builder.writeBoolean(source.resolved);
    builder.writeBoolean(source.outcome);
    builder.writeAddress(source.factory);
    builder.writeNumber(source.marketId);
    builder.writeString(source.marketType);
    builder.writeString(source.question);
    builder.writeString(source.clarification);
    builder.writeNumber(source.version);
    builder.writeCell(source.editHistory.size > 0 ? beginCell().storeDictDirect(source.editHistory, Dictionary.Keys.Uint(8), dictValueParserEditLog()).endCell() : null);
    builder.writeAddress(source.creator);
    builder.writeString(source.createdBy);
    builder.writeString(source.askedBy);
    builder.writeString(source.bannerImage);
    builder.writeNumber(source.lastActive);
    builder.writeCell(source.yesBalances.size > 0 ? beginCell().storeDictDirect(source.yesBalances, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.noBalances.size > 0 ? beginCell().storeDictDirect(source.noBalances, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeNumber(source.winningTotalSupply);
    builder.writeNumber(source.winningPayoutPool);
    builder.writeNumber(source.totalVolume);
    builder.writeNumber(source.yesVolume);
    builder.writeNumber(source.noVolume);
    builder.writeNumber(source.nextActionId);
    builder.writeCell(source.marketHistory.size > 0 ? beginCell().storeDictDirect(source.marketHistory, Dictionary.Keys.BigInt(257), dictValueParserMarketHistory()).endCell() : null);
    return builder.build();
}

export function dictValueParserBinaryMarket$Data(): DictionaryValue<BinaryMarket$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBinaryMarket$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryMarket$Data(src.loadRef().beginParse());
        }
    }
}

export type MarketInit = {
    $$type: 'MarketInit';
    factory: Address;
    marketId: bigint;
}

export function storeMarketInit(src: MarketInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.factory);
        b_0.storeUint(src.marketId, 64);
    };
}

export function loadMarketInit(slice: Slice) {
    const sc_0 = slice;
    const _factory = sc_0.loadAddress();
    const _marketId = sc_0.loadUintBig(64);
    return { $$type: 'MarketInit' as const, factory: _factory, marketId: _marketId };
}

export function loadTupleMarketInit(source: TupleReader) {
    const _factory = source.readAddress();
    const _marketId = source.readBigNumber();
    return { $$type: 'MarketInit' as const, factory: _factory, marketId: _marketId };
}

export function loadGetterTupleMarketInit(source: TupleReader) {
    const _factory = source.readAddress();
    const _marketId = source.readBigNumber();
    return { $$type: 'MarketInit' as const, factory: _factory, marketId: _marketId };
}

export function storeTupleMarketInit(source: MarketInit) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.factory);
    builder.writeNumber(source.marketId);
    return builder.build();
}

export function dictValueParserMarketInit(): DictionaryValue<MarketInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketInit(src)).endCell());
        },
        parse: (src) => {
            return loadMarketInit(src.loadRef().beginParse());
        }
    }
}

export type Factory$Data = {
    $$type: 'Factory$Data';
    nextMarketId: bigint;
}

export function storeFactory$Data(src: Factory$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.nextMarketId, 64);
    };
}

export function loadFactory$Data(slice: Slice) {
    const sc_0 = slice;
    const _nextMarketId = sc_0.loadUintBig(64);
    return { $$type: 'Factory$Data' as const, nextMarketId: _nextMarketId };
}

export function loadTupleFactory$Data(source: TupleReader) {
    const _nextMarketId = source.readBigNumber();
    return { $$type: 'Factory$Data' as const, nextMarketId: _nextMarketId };
}

export function loadGetterTupleFactory$Data(source: TupleReader) {
    const _nextMarketId = source.readBigNumber();
    return { $$type: 'Factory$Data' as const, nextMarketId: _nextMarketId };
}

export function storeTupleFactory$Data(source: Factory$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nextMarketId);
    return builder.build();
}

export function dictValueParserFactory$Data(): DictionaryValue<Factory$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactory$Data(src)).endCell());
        },
        parse: (src) => {
            return loadFactory$Data(src.loadRef().beginParse());
        }
    }
}

export type MarketHistory = {
    $$type: 'MarketHistory';
    timestamp: bigint;
    price: bigint;
    action: boolean;
    outcome: bigint;
    address: Address;
}

export function storeMarketHistory(src: MarketHistory) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.timestamp, 257);
        b_0.storeInt(src.price, 257);
        b_0.storeBit(src.action);
        b_0.storeUint(src.outcome, 8);
        b_0.storeAddress(src.address);
    };
}

export function loadMarketHistory(slice: Slice) {
    const sc_0 = slice;
    const _timestamp = sc_0.loadIntBig(257);
    const _price = sc_0.loadIntBig(257);
    const _action = sc_0.loadBit();
    const _outcome = sc_0.loadUintBig(8);
    const _address = sc_0.loadAddress();
    return { $$type: 'MarketHistory' as const, timestamp: _timestamp, price: _price, action: _action, outcome: _outcome, address: _address };
}

export function loadTupleMarketHistory(source: TupleReader) {
    const _timestamp = source.readBigNumber();
    const _price = source.readBigNumber();
    const _action = source.readBoolean();
    const _outcome = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'MarketHistory' as const, timestamp: _timestamp, price: _price, action: _action, outcome: _outcome, address: _address };
}

export function loadGetterTupleMarketHistory(source: TupleReader) {
    const _timestamp = source.readBigNumber();
    const _price = source.readBigNumber();
    const _action = source.readBoolean();
    const _outcome = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'MarketHistory' as const, timestamp: _timestamp, price: _price, action: _action, outcome: _outcome, address: _address };
}

export function storeTupleMarketHistory(source: MarketHistory) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.price);
    builder.writeBoolean(source.action);
    builder.writeNumber(source.outcome);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserMarketHistory(): DictionaryValue<MarketHistory> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketHistory(src)).endCell());
        },
        parse: (src) => {
            return loadMarketHistory(src.loadRef().beginParse());
        }
    }
}

export type EditLog = {
    $$type: 'EditLog';
    version: bigint;
    editor: Address;
    field: string;
    oldValue: string;
    newValue: string;
    reason: string;
    timestamp: bigint;
}

export function storeEditLog(src: EditLog) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.version, 8);
        b_0.storeAddress(src.editor);
        b_0.storeStringRefTail(src.field);
        b_0.storeStringRefTail(src.oldValue);
        const b_1 = new Builder();
        b_1.storeStringRefTail(src.newValue);
        b_1.storeStringRefTail(src.reason);
        b_1.storeUint(src.timestamp, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadEditLog(slice: Slice) {
    const sc_0 = slice;
    const _version = sc_0.loadUintBig(8);
    const _editor = sc_0.loadAddress();
    const _field = sc_0.loadStringRefTail();
    const _oldValue = sc_0.loadStringRefTail();
    const sc_1 = sc_0.loadRef().beginParse();
    const _newValue = sc_1.loadStringRefTail();
    const _reason = sc_1.loadStringRefTail();
    const _timestamp = sc_1.loadUintBig(64);
    return { $$type: 'EditLog' as const, version: _version, editor: _editor, field: _field, oldValue: _oldValue, newValue: _newValue, reason: _reason, timestamp: _timestamp };
}

export function loadTupleEditLog(source: TupleReader) {
    const _version = source.readBigNumber();
    const _editor = source.readAddress();
    const _field = source.readString();
    const _oldValue = source.readString();
    const _newValue = source.readString();
    const _reason = source.readString();
    const _timestamp = source.readBigNumber();
    return { $$type: 'EditLog' as const, version: _version, editor: _editor, field: _field, oldValue: _oldValue, newValue: _newValue, reason: _reason, timestamp: _timestamp };
}

export function loadGetterTupleEditLog(source: TupleReader) {
    const _version = source.readBigNumber();
    const _editor = source.readAddress();
    const _field = source.readString();
    const _oldValue = source.readString();
    const _newValue = source.readString();
    const _reason = source.readString();
    const _timestamp = source.readBigNumber();
    return { $$type: 'EditLog' as const, version: _version, editor: _editor, field: _field, oldValue: _oldValue, newValue: _newValue, reason: _reason, timestamp: _timestamp };
}

export function storeTupleEditLog(source: EditLog) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.version);
    builder.writeAddress(source.editor);
    builder.writeString(source.field);
    builder.writeString(source.oldValue);
    builder.writeString(source.newValue);
    builder.writeString(source.reason);
    builder.writeNumber(source.timestamp);
    return builder.build();
}

export function dictValueParserEditLog(): DictionaryValue<EditLog> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEditLog(src)).endCell());
        },
        parse: (src) => {
            return loadEditLog(src.loadRef().beginParse());
        }
    }
}

type Factory_init_args = {
    $$type: 'Factory_init_args';
}

// @ts-expect-error src is not used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initFactory_init_args(src: Factory_init_args) {
    return (builder: Builder) => {
        // @ts-expect-error b_0 is not used
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const b_0 = builder;
    };
}

async function Factory_init() {
    const __code = Cell.fromHex('b5ee9c7241026101001bf90003f6ff008e88f4a413f4bcf2c80bed53208f663001d072d721d200d200fa4021103450666f04f86102f862ed44d0d2000194d33f0131923070e202915be07021d74920c21f953101d31f02de218210481337e6bae3022182100ba69751bae30232c00001c121b09cc87f01ca000101cb3fc9ed54e030f2c082e1ed43d901075f02027102030129bfc87f6a268690000ca699f8098c91838716d9e18c1e02012004050129bb24fed44d0d2000194d33f0131923070e2db3c31831012bbb7afed44d0d2000194d33f0131923070e201db3c3180601725301be92306de0f82801db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d00901fe5bd401d001d401d001d33ffa40d30ffa00d307d72c01916d93fa4001e230d430d0d2000193d401d0916de201d2000193d401d0916de201d2000193d430d092306de2813e0425821005f5e100bef2f481327d24c2009324c1649170e2f2f4811ca9f8235290bcf2f48200a6d5f8416f24135f0326821005f5e100a0bef2f42a0802fca4f828500cdb3cf842109c27109c108b107d106c05104d4c030d109a0a0807060504431371502bc855a0db3cc91241437f595f41f90001f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f9040003c8cf8580ca0012cccccf884008cbff01fa028069cf40cf8634f400c901fb00c87f01ca000101cb3fc9ed54095e011888c87001ca005a02cecb3fc90a0262ff008e88f4a413f4bcf2c80bed53208e9c30eda2edfb01d072d721d200d200fa4021103450666f04f86102f862e1ed43d90b340202710c1f0201200d120201200e1003d5b500dda89a1a400031db1b678ae3c2238223a2238223622382236223422362234223222342232223022322230222e2230222e222c222e222c222a222c222a2228222a22282226222822262224222622242222222422222220222222201e22201eaa1dc61db678d9e6d9e7035370f000654743203d9b5361da89a1a400031db1b678ae3c2238223a2238223622382236223422362234223222342232223022322230222e2230222e222c222e222c222a222c222a2228222a22282226222822262224222622242222222422222220222222201e22201eaa1dc61db678ae20be1ed9c303537110014561c812710a8561ea9040201201319020166141603e0a897ed44d0d200018ed8db3c571e111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550ee30edb3c571257105f0f50de5f0d3537150034561d812710a8561e561ea0a904561d812710a8561f561fa0a90403f8aa7eed44d0d200018ed8db3c571e111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550ee30e111d111e111d111c111d111c111b111c111b111a111b111a353717019c1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550edb3c571257105f0f50de5f0d18004a2981010b2259f40a6fa193fa003092306de281010b544a1359f40a6fa193fa003092306de20201201a1d03f9b1b17b513434800063b636cf15c78447044744470446c4470446c4468446c4468446444684464446044644460445c4460445c4458445c4458445444584454445044544450444c4450444c4448444c44484444444844444440444444403c44403d543b8c38447444784474447044744470446c4470446c4468446c446a035371b01c01119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550edb3c57105f0f6ce1206e92306d99206ef2d0806f276f07e2206e92306dde1c0088205611bb92306de17856100259f40f6fa192306ddf206e92306d8e27d0d307fa40d401d001d401d001d401d0d401d001d401d001d33f3010371036103510346c176f07e203d9b290bb513434800063b636cf15c78447044744470446c4470446c4468446c4468446444684464446044644460445c4460445c4458445c4458445444584454445044544450444c4450444c4448444c44484444444844444440444444403c44403d543b8c3b6cf15c417c3db386035371e000220020120202c0201202126020148222403d9afca76a268690000c76c6d9e2b8f088e088e888e088d888e088d888d088d888d088c888d088c888c088c888c088b888c088b888b088b888b088a888b088a888a088a888a0889888a088988890889888908888889088888880888888807888807aa8771876d9e2b882f87b670c035372300022e03d9ac5b76a268690000c76c6d9e2b8f088e088e888e088d888e088d888d088d888d088c888d088c888c088c888c088b888c088b888b088b888b088a888b088a888a088a888a0889888a088988890889888908888889088888880888888807888807aa8771876d9e2b882f87b670c0353725001a561c812710a8561e561ea0a904020120272a04f9b2fa7b513434800063b636cf15c78447044744470446c4470446c4468446c4468446444684464446044644460445c4460445c4458445c4458445444584454445044544450444c4450444c4448444c44484444444844444440444444403c44403d543b8c3b6cf15c555c555c555c555c555c555c555c555c555c555c560353728290058561d561d561d561d561c561c561c561c561c561c561c561c561c561c561256125612561d561f561e561e1023008857155715571557155715571557155715571557155715571557155715571557155715571557150b11140b0a11130a091112090811110807111007106f105e104d103c558203d9b13efb513434800063b636cf15c78447044744470446c4470446c4468446c4468446444684464446044644460445c4460445c4458445c4458445444584454445044544450444c4450444c4448444c44484444444844444440444444403c44403d543b8c3b6cf15c417c3db386035372b000456190201202d2f03d9b6457da89a1a400031db1b678ae3c2238223a2238223622382236223422362234223222342232223022322230222e2230222e222c222e222c222a222c222a2228222a22282226222822262224222622242222222422222220222222201e22201eaa1dc61db678ae20be1ed9c3035372e001a561d812710a8561e561ea0a904020120303203d9b3ed7b513434800063b636cf15c78447044744470446c4470446c4468446c4468446444684464446044644460445c4460445c4458445c4458445444584454445044544450444c4450444c4448444c44484444444844444440444444403c44403d543b8c3b6cf15c417c3db38603537310008f8276f1003d9b0e47b513434800063b636cf15c78447044744470446c4470446c4468446c4468446444684464446044644460445c4460445c4458445c4458445444584454445044544450444c4450444c4448444c44484444444844444440444444403c44403d543b8c3b6cf15c417c3db38603537330014561d812710a8561da90404fced44d0d200018ed8db3c571e111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550ee30e111f955f0f5f0f30e0111dd70d1ff2e082218210481337e6bae302213537383a01f4fa00fa00fa00d30f810101d700fa40d33fd200d2000192d200926d01e2d401d0fa40d33fd401d001d401d001d401d001810101d700d430d0f404d72c01916d93fa4001e201d2000193d401d0916de201d2000193d401d0916de201d430d0d2000193d401d0916de201d2000195810101d700926d01e2f404f4043600a8d33fd33f810101d700810101d700d430d0810101d700810101d700f404301115111e11151115111d11151115111c11151115111b11151115111a111511151119111511151118111511151117111511151116111500eefa40d33f5902d101705470005300706d8b662696e61727988b088b08256d6d6d6d6d6d6d6d5478885470006d8200b39af842561e01c705f2f4f842111b111d111b111a111c111a1119111b11191118111a11181117111911171118111611171116111511161115111411151114111311121111111055e001fa3138383838383a3a3f3f57105710571057100ad401d001d401d001d33ffa40d30ffa00d307d72c01916d93fa4001e201d430d0d2000193d401d0916de201d2000193d401d0916de201d2000193d430d092306de25255a88064a9045155a15350a8f82307111d0702111c0201111b0108111a08111711191117091118093901ce0a11170a1114111611141113111511131112111411121111111311111110111211100c11110c0b11100b10df10be105d104c103b106a095e3410364005c87f01ca00111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed545b044a82101674727bbae3022182104d689170bae3022182107aab1b57bae3022182101ebcd0ddba3b3e414401f4313807fa0030811ced5615b3f2f4813030f8235617b9f2f48142a621c200f2f48200ea06f8416f24135f0322bef2f45122a05112a0225619a8812710a9045133a10111180103a0810101f823561d812710a8561e561ea0a9047f71f842c855405045810101cf0012810101cf00ca00cb07cec902111f02561e013c01fa206e953059f45a30944133f415e2111ca401111a0102a011185618a904111a561aa1561a5619a881010bf842285959f40a6fa193fa003092306de2206e923070de81010bf84202206ef2d0805004a010381028206e953059f4593098c801fa024133f441e2f823111b111d111b1119111c111906111b061118111a11183d01ec061119061116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a50891057104603455504c87f01ca00111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed545b01f4313807fa0030811ced5615b3f2f4813030f8235617b9f2f48142a621c200f2f48200ea06f8416f24135f0322bef2f45122a05172a0225619a8812710a9045133a10111180103a0810101f823561c812710a8561e561ea0a9047f70f842c855405045810101cf0012810101cf00ca00cb07cec902111f02561e013f01fa206e953059f45a30944133f415e2111ca401111b0102a011185618a90411195619a15618561aa881010bf842275959f40a6fa193fa003092306de2206e923070de81010bf84202206ef2d0805004a010371027206e953059f4593098c801fa024133f441e2f8231119111d1119111a111c111a05111b051118111a11184001e41116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a09106817104610354004c87f01ca00111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed545b01fe313807fa0030811ced5615b3f2f4813030f8235617b9f2f4f8422781010b2259f40a6fa193fa003092306de28200ee1b216eb3f2f48142a623c2009921206ef2d0805240bb9170e2f2f4561d23a0111c561ca904561d21a15166a05156a026561da8812710a9045177a101111c0107a0810101f8235621812710a8011122014202fc1121a001112001a9047071f84204112304c855405045810101cf0012810101cf00ca00cb07cec90211210201111e01562001206e953059f45a30944133f415e2111ea4561b561da881010b1121206ef2d0805004a11029011120015290206e953059f4593098c801fa024133f441e2177f500471036d03c8cf8580ca0089474301e6cf16ce01fa02806acf40f400c901fb00f8231119111d1119111a111c111a06111b061118111a1118061119061116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a4819105710460345455a043ce302218210ef42713dbae302218210cf090942bae3022182100ba69751ba4549515301fe313807fa0030811ced5615b3f2f4813030f8235617b9f2f4f8422681010b2259f40a6fa193fa003092306de28200f911216eb3f2f48142a623c2009921206ef2d0805240bb9170e2f2f4561c23a0111c561ca904561e21a15166a051b6a026561da8812710a9045177a101111c0107a0810101f8235620812710a8011122014602fc1121a001112001a9047070f84204112304c855405045810101cf0012810101cf00ca00cb07cec90211210201111e01562001206e953059f45a30944133f415e2111ea4561c561ca881010b1121206ef2d0805004a11028011120015280206e953059f4593098c801fa024133f441e2167f500471036d03c8cf8580ca0089474800011001e2cf16ce01fa02806acf40f400c901fb00f823111a111d111a1119111c111905111b051118111a1118051119051116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a091068102755145a03fe3157141113d200308200c241f8425618c705f2f48200a564f8235617bef2f481793e1115b301111501f2f47f5614e30f705300f82303111d0302111c0201111b011118111a11181117111911171116111811161115111711151115111611151114111511141112111411121111111311111110111211100f11110f0e11100e4a4c5002bc702781010bf4826fa5209502fa00305895316d326d01e2908e1b12a081010b54491359f4746fa5209502fa00305895316d326d01e2e85b20c200e30338571957192481010bf4826fa5209502fa00305895316d326d01e2908ae85b3557184d4b00bc20c2008e3e561b01a827a9040681010b2270206e953059f4593098c801fa024133f441e27f54421870036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb009130e281010b260259f4746fa5209502fa00305895316d326d01e202c8702681010bf4826fa5209502fa00305895316d326d01e2908e1b12a081010b54481359f4746fa5209502fa00305895316d326d01e2e85b20c200e303385719571a2381010bf4826fa5209502fa00305895316d326d01e2908ae85b3557171116111711164d4f01cc30111b111d111b111a111c111a1119111b11191118111a111811171119111711161118111611151117111511161114111511141112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354403024e0158c87f01ca00111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db315b00bc20c2008e3e561a01a827a9040581010b2270206e953059f4593098c801fa024133f441e27f54421771036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb009130e281010b250259f4746fa5209502fa00305895316d326d01e2018210df10ce10bd10ac109b108a0910681057104640050403c87f01ca00111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed545b02fa5b8200e3395615f2f4f8425614206ef2d0808e672681010b2259f40a6fa193fa003092306de281210e216eb39821206ef2d080c2009170e2f2f4206ef2d0805250a826a9040781010b2270206e953059f4593098c801fa024133f441e27f500870036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e30d525500ce2781010b2259f40a6fa193fa003092306de281210e216eb39821206ef2d080c2009170e2f2f4206ef2d0805250a826a9040881010b2270206e953059f4593098c801fa024133f441e27f500970036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb000228e3020182108e8289ffbae3025f0f5f0f30f2c082545601fe31fa00308168c9f8428d08600564aaa7ec58143f3e7fcaf008ef78644c63c559a45589048156240144f28e1f94c705f2f482008ac8f8276f1022bcf2f48d08600564aaa7ec58143f3e7fcaf008ef78644c63c559a45589048156240144f28e1f94017f71036d4313c8cf8580ca00cf8440ce01fa02806acf40f400c901fb005501fc111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca00111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed545b02f2d401d001d401d001d430d08152c45618b3f2f481514df8428d08600564aaa7ec58143f3e7fcaf008ef78644c63c559a45589048156240144f28e1f94c705f2f4820084d48b87175657374696f6e8524001f90101f901ba917f8e188bd636c6172696669636174696f6e8524001f90101f901bae2f2f4895230575800107175657374696f6e01fe01f90101f901ba925612925611e21111a4208b87175657374696f6e8525001f90101f901ba935714228e218bd636c6172696669636174696f6e8525001f90101f901ba955713221113de1114e278f842f8232445161048031116034700c855605067cb0714ce02c8ce12cd01c8cecdc802c8ce12cd02c8ce12cd12cb3fcdc95901ee103f02111002206e953059f45b30944133f417e2111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100d11110d0e111010bd10ac109b108a1079106810571046103544035a0154c87f01ca00111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed545b02f601111e01111dfa0201111bfa02011119fa0201111701cb0f01111501810101cf0001111301ce01111101cb3f1fca002d6eb3977f01ca001dca00963d70500dca00e20bc8ce1acb3f08c8ce18cd06c8ce16cd04c8ce14cd12810101cf0001c8f40058206e9430cf84809201cee2226eb395327058ca00e30d226eb35c5d000e02c8cec958f40000d29702c8cec958f40095327058ca00e2c8236eb39803c8cec95003f4009633705003ca00e2246eb39a7f01ca0014810101cf009634705004ca00e214f40014f40014cb3f14cb3f14810101cf0014810101cf0004c8810101cf0016810101cf0014f40012cd13cd12cdcd00ca8210481337e6500ccb1f0ac8ce1acd08c8ce18cd16cb3f14ce12cb0f01fa02cb0701206e9430cf84809201cee2c8226eb39702c8cec958f40095327058ca00e2226eb39702c8cec958f40095327058ca00e2226eb39702c8cec958f40095327058ca00e2cd01fe5bfa00308168c9f8428d08600564aaa7ec58143f3e7fcaf008ef78644c63c559a45589048156240144f28e1f94c705f2f482008ac8f8276f1022bcf2f48d08600564aaa7ec58143f3e7fcaf008ef78644c63c559a45589048156240144f28e1f94017f71036d4313c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00600018c87f01ca000101cb3fc9ed54cfa479f3');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initFactory_init_args({ $$type: 'Factory_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const Factory_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    7337: { message: "can't travel back in time" },
    7405: { message: "Market resolved" },
    8462: { message: "No winning tokens" },
    12336: { message: "Market closed" },
    12925: { message: "Invalid probability" },
    15876: { message: "Min liquidity .1 TON" },
    17062: { message: "Invalid amount" },
    20813: { message: "Unauthorized editor" },
    21188: { message: "Cannot edit resovled market" },
    26825: { message: "Only owner can withdraw" },
    31038: { message: "Already resolved" },
    34004: { message: "Invalid field" },
    35528: { message: "Withdraw amount must to be strictly less than balance" },
    42340: { message: "Too early" },
    42709: { message: "Send atleast .1 TON + initial liquidity" },
    45978: { message: "Unauthorized deployment" },
    49729: { message: "Unauthorized" },
    58169: { message: "Not resolved" },
    59910: { message: "Inssuficient TON" },
    60955: { message: "No Yes shares to sell" },
    63761: { message: "No NO shares to sell" },
} as const

export const Factory_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "can't travel back in time": 7337,
    "Market resolved": 7405,
    "No winning tokens": 8462,
    "Market closed": 12336,
    "Invalid probability": 12925,
    "Min liquidity .1 TON": 15876,
    "Invalid amount": 17062,
    "Unauthorized editor": 20813,
    "Cannot edit resovled market": 21188,
    "Only owner can withdraw": 26825,
    "Already resolved": 31038,
    "Invalid field": 34004,
    "Withdraw amount must to be strictly less than balance": 35528,
    "Too early": 42340,
    "Send atleast .1 TON + initial liquidity": 42709,
    "Unauthorized deployment": 45978,
    "Unauthorized": 49729,
    "Not resolved": 58169,
    "Inssuficient TON": 59910,
    "No Yes shares to sell": 60955,
    "No NO shares to sell": 63761,
} as const

const Factory_types: ABIType[] = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SignedBundle", "header": null, "fields": [{ "name": "signature", "type": { "kind": "simple", "type": "fixed-bytes", "optional": false, "format": 64 } }, { "name": "signedData", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "CreateMarket", "header": 1209219046, "fields": [{ "name": "question", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "clarification", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "closeTimestamp", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "oracleAddr", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "feeBps", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 16 } }, { "name": "initialLiquidity", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "initialProbability", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "creator", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "createdBy", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "askedBy", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "bannerImage", "type": { "kind": "simple", "type": "string", "optional": true } }] },
    { "name": "Withdraw", "header": 195467089, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "BuyYes", "header": 376730235, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "BuyNo", "header": 1298698608, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "SellYes", "header": 2058034007, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "SellNo", "header": 515690717, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "Resolve", "header": 4014108989, "fields": [{ "name": "outcome", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "Redeem", "header": 3473475906, "fields": [{ "name": "addr", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "EditMarketDetails", "header": 2390919679, "fields": [{ "name": "field", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "newValue", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "reason", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "MarketState", "header": null, "fields": [{ "name": "reserveYes", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "reserveNo", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "k", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "feeBps", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 16 } }, { "name": "oracleAddr", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "closeTimestamp", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "resolved", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "outcome", "type": { "kind": "simple", "type": "bool", "optional": true } }, { "name": "factory", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "marketId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "marketType", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "question", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "clarification", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "version", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "totalVolume", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "yesVolume", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "noVolume", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "creator", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "createdBy", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "askedBy", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "bannerImage", "type": { "kind": "simple", "type": "string", "optional": true } }] },
    { "name": "YesNoBalances", "header": null, "fields": [{ "name": "yes", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "no", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "Probabilities", "header": null, "fields": [{ "name": "yes", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "no", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "MarketVolume", "header": null, "fields": [{ "name": "totalVolume", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "yesVolume", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "noVolume", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "BinaryMarket$Data", "header": null, "fields": [{ "name": "reserveYes", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "reserveNo", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "k", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "feeBps", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 16 } }, { "name": "collectedFees", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "oracleAddr", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "closeTimestamp", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "resolved", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "outcome", "type": { "kind": "simple", "type": "bool", "optional": true } }, { "name": "factory", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "marketId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "marketType", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "question", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "clarification", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "version", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "editHistory", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "EditLog", "valueFormat": "ref" } }, { "name": "creator", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "createdBy", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "askedBy", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "bannerImage", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "lastActive", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "yesBalances", "type": { "kind": "dict", "key": "address", "value": "uint", "valueFormat": "coins" } }, { "name": "noBalances", "type": { "kind": "dict", "key": "address", "value": "uint", "valueFormat": "coins" } }, { "name": "winningTotalSupply", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "winningPayoutPool", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "totalVolume", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "yesVolume", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "noVolume", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "nextActionId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "marketHistory", "type": { "kind": "dict", "key": "int", "value": "MarketHistory", "valueFormat": "ref" } }] },
    { "name": "MarketInit", "header": null, "fields": [{ "name": "factory", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "marketId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "Factory$Data", "header": null, "fields": [{ "name": "nextMarketId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "MarketHistory", "header": null, "fields": [{ "name": "timestamp", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "action", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "outcome", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "EditLog", "header": null, "fields": [{ "name": "version", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "editor", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "field", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "oldValue", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "newValue", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "reason", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "timestamp", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
]

const Factory_opcodes = {
    "CreateMarket": 1209219046,
    "Withdraw": 195467089,
    "BuyYes": 376730235,
    "BuyNo": 1298698608,
    "SellYes": 2058034007,
    "SellNo": 515690717,
    "Resolve": 4014108989,
    "Redeem": 3473475906,
    "EditMarketDetails": 2390919679,
}

const Factory_getters: ABIGetter[] = [
    { "name": "getMarketAddress", "methodId": 128943, "arguments": [{ "name": "marketId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "address", "optional": true } },
    { "name": "getNextMarketId", "methodId": 96527, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "factoryBalance", "methodId": 111183, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
]

export const Factory_getterMapping: { [key: string]: string } = {
    'getMarketAddress': 'getGetMarketAddress',
    'getNextMarketId': 'getGetNextMarketId',
    'factoryBalance': 'getFactoryBalance',
}

const Factory_receivers: ABIReceiver[] = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CreateMarket" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Withdraw" } },
]

export const MIN_LIQUIDITY = 100000000n;
export const FEE_DENOMINATOR = 10000n;
export const OWNER = address("EQCslVT9iwKH58_5XgEd7wyJjHirNIqxIJAqxIAonlHD8jdK");

export class Factory implements Contract {

    public static readonly storageReserve = 0n;
    public static readonly errors = Factory_errors_backward;
    public static readonly opcodes = Factory_opcodes;

    static async init() {
        return await Factory_init();
    }

    static async fromInit() {
        const __gen_init = await Factory_init();
        const address = contractAddress(0, __gen_init);
        return new Factory(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new Factory(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types: Factory_types,
        getters: Factory_getters,
        receivers: Factory_receivers,
        errors: Factory_errors,
    };

    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean | null | undefined }, message: null | CreateMarket | Withdraw) {

        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateMarket') {
            body = beginCell().store(storeCreateMarket(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }

        await provider.internal(via, { ...args, body: body });

    }

    async getGetMarketAddress(provider: ContractProvider, marketId: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(marketId);
        const source = (await provider.get('getMarketAddress', builder.build())).stack;
        const result = source.readAddressOpt();
        return result;
    }

    async getGetNextMarketId(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getNextMarketId', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }

    async getFactoryBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('factoryBalance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }

}
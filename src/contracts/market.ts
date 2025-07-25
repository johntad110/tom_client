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

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
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

export type CreateMarket = {
    $$type: 'CreateMarket';
    question: string;
    clarification: string;
    closeTimestamp: bigint;
    oracleAddr: Address;
    feeBps: bigint;
    initialLiquidity: bigint;
    initialProbability: bigint;
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
    return { $$type: 'CreateMarket' as const, question: _question, clarification: _clarification, closeTimestamp: _closeTimestamp, oracleAddr: _oracleAddr, feeBps: _feeBps, initialLiquidity: _initialLiquidity, initialProbability: _initialProbability };
}

export function loadTupleCreateMarket(source: TupleReader) {
    const _question = source.readString();
    const _clarification = source.readString();
    const _closeTimestamp = source.readBigNumber();
    const _oracleAddr = source.readAddress();
    const _feeBps = source.readBigNumber();
    const _initialLiquidity = source.readBigNumber();
    const _initialProbability = source.readBigNumber();
    return { $$type: 'CreateMarket' as const, question: _question, clarification: _clarification, closeTimestamp: _closeTimestamp, oracleAddr: _oracleAddr, feeBps: _feeBps, initialLiquidity: _initialLiquidity, initialProbability: _initialProbability };
}

export function loadGetterTupleCreateMarket(source: TupleReader) {
    const _question = source.readString();
    const _clarification = source.readString();
    const _closeTimestamp = source.readBigNumber();
    const _oracleAddr = source.readAddress();
    const _feeBps = source.readBigNumber();
    const _initialLiquidity = source.readBigNumber();
    const _initialProbability = source.readBigNumber();
    return { $$type: 'CreateMarket' as const, question: _question, clarification: _clarification, closeTimestamp: _closeTimestamp, oracleAddr: _oracleAddr, feeBps: _feeBps, initialLiquidity: _initialLiquidity, initialProbability: _initialProbability };
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
    question: string;
    clarification: string;
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
        b_1.storeStringRefTail(src.question);
        b_1.storeStringRefTail(src.clarification);
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
    const _question = sc_1.loadStringRefTail();
    const _clarification = sc_1.loadStringRefTail();
    return { $$type: 'MarketState' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, question: _question, clarification: _clarification };
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
    const _question = source.readString();
    const _clarification = source.readString();
    return { $$type: 'MarketState' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, question: _question, clarification: _clarification };
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
    const _question = source.readString();
    const _clarification = source.readString();
    return { $$type: 'MarketState' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, question: _question, clarification: _clarification };
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
    builder.writeString(source.question);
    builder.writeString(source.clarification);
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

export type BinaryMarket$Data = {
    $$type: 'BinaryMarket$Data';
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
    question: string;
    clarification: string;
    yesBalances: Dictionary<Address, bigint>;
    noBalances: Dictionary<Address, bigint>;
    winningTotalSupply: bigint;
    winningPayoutPool: bigint;
}

export function storeBinaryMarket$Data(src: BinaryMarket$Data) {
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
        b_1.storeStringRefTail(src.question);
        b_1.storeStringRefTail(src.clarification);
        b_1.storeDict(src.yesBalances, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_1.storeDict(src.noBalances, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        b_1.storeUint(src.winningTotalSupply, 64);
        b_1.storeUint(src.winningPayoutPool, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBinaryMarket$Data(slice: Slice) {
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
    const _question = sc_1.loadStringRefTail();
    const _clarification = sc_1.loadStringRefTail();
    const _yesBalances = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_1);
    const _noBalances = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_1);
    const _winningTotalSupply = sc_1.loadUintBig(64);
    const _winningPayoutPool = sc_1.loadUintBig(64);
    return { $$type: 'BinaryMarket$Data' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, question: _question, clarification: _clarification, yesBalances: _yesBalances, noBalances: _noBalances, winningTotalSupply: _winningTotalSupply, winningPayoutPool: _winningPayoutPool };
}

export function loadTupleBinaryMarket$Data(source: TupleReader) {
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
    const _question = source.readString();
    const _clarification = source.readString();
    const _yesBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _noBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    source = source.readTuple();
    const _winningTotalSupply = source.readBigNumber();
    const _winningPayoutPool = source.readBigNumber();
    return { $$type: 'BinaryMarket$Data' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, question: _question, clarification: _clarification, yesBalances: _yesBalances, noBalances: _noBalances, winningTotalSupply: _winningTotalSupply, winningPayoutPool: _winningPayoutPool };
}

export function loadGetterTupleBinaryMarket$Data(source: TupleReader) {
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
    const _question = source.readString();
    const _clarification = source.readString();
    const _yesBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _noBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _winningTotalSupply = source.readBigNumber();
    const _winningPayoutPool = source.readBigNumber();
    return { $$type: 'BinaryMarket$Data' as const, reserveYes: _reserveYes, reserveNo: _reserveNo, k: _k, feeBps: _feeBps, oracleAddr: _oracleAddr, closeTimestamp: _closeTimestamp, resolved: _resolved, outcome: _outcome, factory: _factory, marketId: _marketId, question: _question, clarification: _clarification, yesBalances: _yesBalances, noBalances: _noBalances, winningTotalSupply: _winningTotalSupply, winningPayoutPool: _winningPayoutPool };
}

export function storeTupleBinaryMarket$Data(source: BinaryMarket$Data) {
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
    builder.writeString(source.question);
    builder.writeString(source.clarification);
    builder.writeCell(source.yesBalances.size > 0 ? beginCell().storeDictDirect(source.yesBalances, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.noBalances.size > 0 ? beginCell().storeDictDirect(source.noBalances, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeNumber(source.winningTotalSupply);
    builder.writeNumber(source.winningPayoutPool);
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

type BinaryMarket_init_args = {
    $$type: 'BinaryMarket_init_args';
    data: MarketInit;
}

function initBinaryMarket_init_args(src: BinaryMarket_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storeMarketInit(src.data));
    };
}

async function BinaryMarket_init(data: MarketInit) {
    const __code = Cell.fromHex('b5ee9c7241022c01000b8a00022cff008e88f4a413f4bcf2c80bed53208e8130e1ed43d90115020271020702012003050293ba9b0ed44d0d200018e37fa40d33f5902d1017054700020706d8b088b086d6d53668200b39af842561001c705f2f4f84210df10ce10bd10ac0b109a108907085550e30ddb3c57105f0f8160400122e812710a85610a90402a3b8e7eed44d0d200018e37fa40d33f5902d1017054700020706d8b088b086d6d53668200b39af842561001c705f2f4f84210df10ce10bd10ac0b109a108907085550e30d0f11100f550edb3c571057105f0e81606004a2481010b2259f40a6fa193fa003092306de281010b54451359f40a6fa193fa003092306de2020120080d020120090b0293b516dda89a1a400031c6ff481a67eb205a202e0a8e00040e0db16111610dadaa6cd04016735f084ac20038e0be5e9f08421be219c217a215816213421120e10aaa1c61bb678ae20be1f0160a00182e812710a856105610a0a9040293b57d3da89a1a400031c6ff481a67eb205a202e0a8e00040e0db16111610dadaa6cd04016735f084ac20038e0be5e9f08421be219c217a215816213421120e10aaa1c61bb678d998d8990160c0018547fed547fed547fed547fed0201200e100293b6457da89a1a400031c6ff481a67eb205a202e0a8e00040e0db16111610dadaa6cd04016735f084ac20038e0be5e9f08421be219c217a215816213421120e10aaa1c61bb678ae20be1f0160f00182f812710a856105610a0a90402012011130293b3ed7b5134348000638dfe9034cfd640b4405c151c00081c1b62c222c21b5b54d9a0802ce6be1095840071c17cbd3e108437c433842f442b02c426842241c2155438c376cf15c417c3e016120008f8276f100293b0e47b5134348000638dfe9034cfd640b4405c151c00081c1b62c222c21b5b54d9a0802ce6be1095840071c17cbd3e108437c433842f442b02c426842241c2155438c376cf15c417c3e0161400102f812710a82fa90404f601d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e37fa40d33f5902d1017054700020706d8b088b086d6d53668200b39af842561001c705f2f4f84210df10ce10bd10ac0b109a108907085550e30d1111935f0f5be00fd70d1ff2e082218210481337e6bae3022182101674727bbae302211617181a0090fa00fa00fa00d30ffa40d33fd200d2000192d200926d01e2fa40d401d0d33fd401d001d401d001f404f404d33fd33f3007111007107f107e107d107c107b107a107910785710550e016c31333337373737373702d401d001d401d001d33ffa40d30ffa00d307305210a88064a90466a15ca84fed103c104b105a085e330345152501fc31fa0030811ced29b3f2f4813030f8232bb9f2f48142a621c200f2f48200ea06f8416f24135f0322bef2f4530ba8812710a904a11da051bba90451dda153dba881010bf842245959f40a6fa193fa003092306de2206e923070de81010bf84202206ef2d0805004a010341024206e953059f4593098c801fa024133f441e21900d010df10be1d10ac109b108a107910681057104610354433c87f01ca00111055e0011110010ffa02500dfa02500bfa0219cb0f17ce15cb3f13ca00216eb3967f01ca00ca00947032ca00e2ce01c8cb3f02c8ce12cd02c8ce12cd12f40012f40013cb3fcb3fcdc9ed5402f882104d689170ba8ef131fa0030811ced29b3f2f4813030f8232bb9f2f48142a621c200f2f48200ea06f8416f24135f0322bef2f4530ba8812710a904a11ea051bba90451cca153bca881010bf84256105959f40a6fa193fa003092306de2206e923070de81010bf84202206ef2d0805004a00311100302111002e0211b1c00ce206e953059f4593098c801fa024133f441e25e3b551ac87f01ca00111055e0011110010ffa02500dfa02500bfa0219cb0f17ce15cb3f13ca00216eb3967f01ca00ca00947032ca00e2ce01c8cb3f02c8ce12cd02c8ce12cd12f40012f40013cb3fcb3fcdc9ed5402fa82107aab1b57ba8ef231fa0030811ced29b3f2f4813030f8232bb9f2f4f8422381010b2259f40a6fa193fa003092306de28200ee1b216eb3f2f48142a623c2009921206ef2d0805240bb9170e2f2f4111022a051eea90451ffa1530da8812710a904a153efa881010b1112206ef2d0805004a11025011111015250e0211d1e016e206e953059f4593098c801fa024133f441e2137f01111071036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb005e3b1d551a2502fe82101ebcd0ddba8ef431fa0030811ced29b3f2f4813030f8232bb9f2f4f8422281010b2259f40a6fa193fa003092306de28200f911216eb3f2f48142a623c2009921206ef2d0805240bb9170e2f2f451f2a051eea90411105610a1530da8812710a904a156102fa881010b1111206ef2d0805004a11024011110015240e0211f200190206e953059f4593098c801fa024133f441e2127f500f71036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0010df10be0d10ac109b108a1079106810571046103544302504a68210ef42713dba8fc131373b05d200308200c241f8422ac705f2f48200a564f82329bef2f481793e07b317f2f47f26e30f70543ddd50ed10ac109b108a10891078105710461035044313e0218210cf090942ba2123252601b83b702581010bf4826fa5209502fa00305895316d326d01e2908e1b12a081010b54471359f4746fa5209502fa00305895316d326d01e2e85b81566021c200f2f42581010bf4826fa5209502fa00305895316d326d01e2908ae85f033b2200ba20c2008e3d52e0a822a9040781010b2270206e953059f4593098c801fa024133f441e27f54421970036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb009130e281010b270259f4746fa5209502fa00305895316d326d01e201bc3c702a81010bf4826fa5209502fa00305895316d326d01e2908e1b12a081010b544c1359f4746fa5209502fa00305895316d326d01e2e85b8127e721c200f2f42a81010bf4826fa5209502fa00305895316d326d01e2908ae85f033a109a2400ba20c2008e3d52d0a822a9040c81010b2270206e953059f4593098c801fa024133f441e27f54421e71036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb009130e281010b2c0259f4746fa5209502fa00305895316d326d01e200a2c87f01ca00111055e0011110010ffa02500dfa02500bfa0219cb0f17ce15cb3f13ca00216eb3967f01ca00ca00947032ca00e2ce01c8cb3f02c8ce12cd02c8ce12cd12f40012f40013cb3fcb3fcdc9ed540224e3020182100ba69751bae3025f0f5bf2c082272a02fe5b8200e33928f2f4f84227206ef2d0808e692181010b2259f40a6fa193fa003092306de281210e216eb39821206ef2d080c2009170e2f2f4206ef2d080561101a85610a9040281010b2270206e953059f4593098c801fa024133f441e27f500370036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e30d10df282900d22281010b2259f40a6fa193fa003092306de281210e216eb39821206ef2d080c2009170e2f2f4206ef2d080561101a85610a9040381010b2270206e953059f4593098c801fa024133f441e27f500470036d03c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0000a6551cc87f01ca00111055e0011110010ffa02500dfa02500bfa0219cb0f17ce15cb3f13ca00216eb3967f01ca00ca00947032ca00e2ce01c8cb3f02c8ce12cd02c8ce12cd12f40012f40013cb3fcb3fcdc9ed5401fcfa00308168c9f8428d08600564aaa7ec58143f3e7fcaf008ef78644c63c559a45589048156240144f28e1f94c705f2f482008ac8f8276f1022bcf2f48d08600564aaa7ec58143f3e7fcaf008ef78644c63c559a45589048156240144f28e1f94017f71036d4313c8cf8580ca00cf8440ce01fa02806acf40f400c901fb002b00aa10df551cc87f01ca00111055e0011110010ffa02500dfa02500bfa0219cb0f17ce15cb3f13ca00216eb3967f01ca00ca00947032ca00e2ce01c8cb3f02c8ce12cd02c8ce12cd12f40012f40013cb3fcb3fcdc9ed54691237cf');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initBinaryMarket_init_args({ $$type: 'BinaryMarket_init_args', data })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const BinaryMarket_errors = {
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
    10215: { message: "No NO shares" },
    12336: { message: "Market closed" },
    12925: { message: "Invalid probability" },
    15876: { message: "Min liquidity .1 TON" },
    17062: { message: "Invalid amount" },
    22112: { message: "No YES shares" },
    26825: { message: "Only owner can withdraw" },
    31038: { message: "Already resolved" },
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

export const BinaryMarket_errors_backward = {
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
    "No NO shares": 10215,
    "Market closed": 12336,
    "Invalid probability": 12925,
    "Min liquidity .1 TON": 15876,
    "Invalid amount": 17062,
    "No YES shares": 22112,
    "Only owner can withdraw": 26825,
    "Already resolved": 31038,
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

const BinaryMarket_types: ABIType[] = [
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
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "MarketInit", "header": null, "fields": [{ "name": "factory", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "marketId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CreateMarket", "header": 1209219046, "fields": [{ "name": "question", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "clarification", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "closeTimestamp", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "oracleAddr", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "feeBps", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 16 } }, { "name": "initialLiquidity", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "initialProbability", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }] },
    { "name": "Withdraw", "header": 195467089, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "Factory$Data", "header": null, "fields": [{ "name": "nextMarketId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "MarketState", "header": null, "fields": [{ "name": "reserveYes", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "reserveNo", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "k", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "feeBps", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 16 } }, { "name": "oracleAddr", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "closeTimestamp", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "resolved", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "outcome", "type": { "kind": "simple", "type": "bool", "optional": true } }, { "name": "factory", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "marketId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "question", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "clarification", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "YesNoBalances", "header": null, "fields": [{ "name": "yes", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "no", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "BuyYes", "header": 376730235, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "BuyNo", "header": 1298698608, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "SellYes", "header": 2058034007, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "SellNo", "header": 515690717, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "Resolve", "header": 4014108989, "fields": [{ "name": "outcome", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "Redeem", "header": 3473475906, "fields": [{ "name": "addr", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "BinaryMarket$Data", "header": null, "fields": [{ "name": "reserveYes", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "reserveNo", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "k", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "feeBps", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 16 } }, { "name": "oracleAddr", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "closeTimestamp", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "resolved", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "outcome", "type": { "kind": "simple", "type": "bool", "optional": true } }, { "name": "factory", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "marketId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "question", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "clarification", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "yesBalances", "type": { "kind": "dict", "key": "address", "value": "uint", "valueFormat": "coins" } }, { "name": "noBalances", "type": { "kind": "dict", "key": "address", "value": "uint", "valueFormat": "coins" } }, { "name": "winningTotalSupply", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "winningPayoutPool", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
]

const BinaryMarket_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "CreateMarket": 1209219046,
    "Withdraw": 195467089,
    "BuyYes": 376730235,
    "BuyNo": 1298698608,
    "SellYes": 2058034007,
    "SellNo": 515690717,
    "Resolve": 4014108989,
    "Redeem": 3473475906,
}

const BinaryMarket_getters: ABIGetter[] = [
    { "name": "yesProportion", "methodId": 119339, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "noPropotion", "methodId": 100534, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getPriceYes", "methodId": 76208, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getPriceNo", "methodId": 127889, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getMarketState", "methodId": 109545, "arguments": [], "returnType": { "kind": "simple", "type": "MarketState", "optional": false } },
    { "name": "getUserBalances", "methodId": 85630, "arguments": [{ "name": "addr", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "YesNoBalances", "optional": false } },
    { "name": "marketBalance", "methodId": 126901, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
]

export const BinaryMarket_getterMapping: { [key: string]: string } = {
    'yesProportion': 'getYesProportion',
    'noPropotion': 'getNoPropotion',
    'getPriceYes': 'getGetPriceYes',
    'getPriceNo': 'getGetPriceNo',
    'getMarketState': 'getGetMarketState',
    'getUserBalances': 'getGetUserBalances',
    'marketBalance': 'getMarketBalance',
}

const BinaryMarket_receivers: ABIReceiver[] = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "CreateMarket" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "BuyYes" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "BuyNo" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SellYes" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SellNo" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Resolve" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Redeem" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Withdraw" } },
]

export const MIN_LIQUIDITY = 100000000n;
export const FEE_DENOMINATOR = 10000n;
export const OWNER = address("EQCslVT9iwKH58_5XgEd7wyJjHirNIqxIJAqxIAonlHD8jdK");

export class BinaryMarket implements Contract {

    public static readonly storageReserve = 0n;
    public static readonly errors = BinaryMarket_errors_backward;
    public static readonly opcodes = BinaryMarket_opcodes;

    static async init(data: MarketInit) {
        return await BinaryMarket_init(data);
    }

    static async fromInit(data: MarketInit) {
        const __gen_init = await BinaryMarket_init(data);
        const address = contractAddress(0, __gen_init);
        return new BinaryMarket(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new BinaryMarket(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types: BinaryMarket_types,
        getters: BinaryMarket_getters,
        receivers: BinaryMarket_receivers,
        errors: BinaryMarket_errors,
    };

    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean | null | undefined }, message: CreateMarket | BuyYes | BuyNo | SellYes | SellNo | Resolve | Redeem | Withdraw) {

        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateMarket') {
            body = beginCell().store(storeCreateMarket(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BuyYes') {
            body = beginCell().store(storeBuyYes(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BuyNo') {
            body = beginCell().store(storeBuyNo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SellYes') {
            body = beginCell().store(storeSellYes(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SellNo') {
            body = beginCell().store(storeSellNo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Resolve') {
            body = beginCell().store(storeResolve(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Redeem') {
            body = beginCell().store(storeRedeem(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }

        await provider.internal(via, { ...args, body: body });

    }

    async getYesProportion(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('yesProportion', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }

    async getNoPropotion(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('noPropotion', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetPriceYes(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getPriceYes', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetPriceNo(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getPriceNo', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetMarketState(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getMarketState', builder.build())).stack;
        const result = loadGetterTupleMarketState(source);
        return result;
    }

    async getGetUserBalances(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getUserBalances', builder.build())).stack;
        const result = loadGetterTupleYesNoBalances(source);
        return result;
    }

    async getMarketBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('marketBalance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }

}
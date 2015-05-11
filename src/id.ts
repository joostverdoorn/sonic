type IdToken = number | string | IId;
interface IId extends Array<IdToken> {};

export type Id = IdToken | Array<IdToken | IId>;
export default Id;

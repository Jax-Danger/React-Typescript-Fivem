import { atom, useRecoilState } from "recoil";

export interface INavigationAtomValue {
	path: string;
	lastPath?: string;
	data?: any;
}

const navigationAtom = atom<INavigationAtomValue>({
	key: "pageState",
	default: { path: "", lastPath: "" },
});

export const useNavigationState = () => {
	return useRecoilState(navigationAtom);
};

export default navigationAtom;

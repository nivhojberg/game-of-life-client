import { CellState } from "../messages";

interface Props {
    cellValue: CellState;
    onClickCell?: () => void;
}

const Cell = (props: Props) => {
    return (
        <div
            className={`cell ${props.cellValue}`}
            onClick={
                props.onClickCell ? () => props.onClickCell() : undefined
            }
        />
    );
};

export default Cell;

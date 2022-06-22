import { CellState } from "../messages";
import Cell from "./Cell";

interface Props {
    rowIndex: number;
    columns: CellState[];
    onClickCell?: (rowIndex: number, colIndex: number) => void;
};

const Row = (props: Props): JSX.Element => {
    return (
        <div className="row">
            {props.columns.map((col: CellState, colIndex: number) => (
                <Cell
                    key={`row-${props.rowIndex}-col-${colIndex}`}
                    cellValue={col}
                    onClickCell={
                        props.onClickCell ? () => props.onClickCell(props.rowIndex, colIndex) : undefined
                    }
                />
            ))}
        </div>
    )
};

export default Row;

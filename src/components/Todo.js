import { useContext } from "react";
import Button from "@atlaskit/button";
import styled, { css } from "styled-components";
import { Context } from "../App";
import CheckIcon from "@atlaskit/icon/glyph/check";

const ButtonStyled = styled(Button)`
	margin-top: 5px;
	text-align: left;
	text-transform: capitalize;

	&,
	&:hover,
	&:disabled {
		${(p) =>
			p.iscompleted === "true" &&
			css`
				text-decoration: line-through;
			`}
	}

	&:hover {
		.check-icon {
			display: inline-block;
		}
	}

	.check-icon {
		&:hover {
			background-color: #e0e0e0;
		}

		display: none;
		border-radius: 4px;
	}
`;

export default function Todo({ job }) {
	const handleJobCompleted = useContext(Context);

	return (
		<ButtonStyled
			shouldFitContainer
			iscompleted={job.isCompleted.toString()}
			onClick={() => {
				handleJobCompleted(job.id);
			}}
			isDisabled={job.isCompleted}
			iconAfter={
				<span className="check-icon">
					<CheckIcon primaryColor="#00E676" />
				</span>
			}
		>
			{job.name}
		</ButtonStyled>
	);
}

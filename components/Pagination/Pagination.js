import React from "react";
import Link from "next/link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { perPage } from "../../config";
import PaginationStyles from "../styles/PaginationStyles";

export const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		_allStorageUnitsMeta {
			count
		}
	}
`;

function Pagination({ page }) {
	const { data, error, loading } = useQuery(PAGINATION_QUERY);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>error...</p>;
	const { count } = data._allStorageUnitsMeta;
	const pageCount = Math.ceil(count / perPage);
	return (
		<PaginationStyles>
			<Link href={`/storages/${page - 1}`}>
				<a aria-disabled={page <= 1}>⏪ Prev</a>
			</Link>

			<p>
				Page {page} of {pageCount}
			</p>

			<Link href={`/storages/${page + 1}`}>
				<a aria-disabled={page >= pageCount}>Next ⏩</a>
			</Link>
		</PaginationStyles>
	);
}

export default Pagination;

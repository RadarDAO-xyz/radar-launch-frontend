interface BelieveEvent {
  id: string;
  editionId: string;
  believer: string;
  tags: string;
  blockTimestamp: string;
}

export async function fetchBelieveEvents(
  editionId: number,
): Promise<BelieveEvent[] | undefined> {
  console.log('here', { editionId, a: process.env.GRAPHQL_ENDPOINT });

  try {
    const response = await fetch(process.env.GRAPHQL_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
  editionBelieveds(where:{editionId:${editionId}}) {
    id
    editionId
    believer
    tags
    blockTimestamp
  }
}`,
      }),
    });
    if (!response.ok) {
      throw new Error('Error fetching events for ' + editionId);
    }
    const data = await response.json();
    if (!('data' in data) || !('editionBelieveds' in data.data)) {
      throw new Error('Error with response data' + JSON.stringify(data));
    }
    return data.data.editionBelieveds;
  } catch (e) {
    console.error(e);
  }
}

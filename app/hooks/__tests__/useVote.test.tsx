// import fetch, { Response } from 'node-fetch'

import { renderHook, act } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import useVote from '../useVote'
import { useLocalStorage } from '../useStorage'

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
)

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../useStorage', () => ({
  useLocalStorage: jest.fn(),
}))

const mockRouter = {
  refresh: jest.fn(),
}

const mockUseLocalStorage = (initialValue: any) => {
  let state = initialValue;
  const setState = jest.fn((newValue) => {
    state = typeof newValue === 'function' ? newValue(state) : newValue;
    return state;
  });
  return [state, setState];
};

describe('useVote hook', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should start with a vote count of 0 and currentVote null', () => {
    ;(useLocalStorage as jest.Mock).mockReturnValue(mockUseLocalStorage([]))
    const { result } = renderHook(() => useVote('destId', [], 'folderId'))
    expect(result.current.votesCount).toBe(0)
    expect(result.current.currentVote).toBe(null)
  })

  it('should handle voting when up vote is clicked', async () => {
    const { result } = renderHook(() => useVote('destId', [], 'folderId'))
    await act(async () => {
      await result.current.handleVote('up')
    })

    expect(result.current.votesCount).toBe(1)
    expect(result.current.currentVote).toBe('up')
    expect(mockRouter.refresh).toHaveBeenCalled()
  })

  it('should handle voting when down vote is clicked', async () => {    
    const { result } = renderHook(() => useVote('destId', [], 'folderId'))
    await act(async () => {
      await result.current.handleVote('down')
    })
    expect(result.current.votesCount).toBe(-1)
    expect(result.current.currentVote).toBe('down')
    expect(mockRouter.refresh).toHaveBeenCalled()
  })

  it('should keep the currentVote unchanged if voted again with different value', async () => {
    const localVotes = [{ folderId: 'folderId', destinations: [{ id: 'destId', vote: 1 }] }]
    ;(useLocalStorage as jest.Mock).mockImplementation((key, initialValue) => mockUseLocalStorage(localVotes))

    const { result } = renderHook(() => useVote('destId', [{ votes: 1, upVotes: 1, downVotes: 0}], 'folderId'))
    await act(async () => {
      await result.current.handleVote('down')
    })
    expect(result.current.votesCount).toBe(1)
    expect(result.current.currentVote).toBe('up')
    expect(mockRouter.refresh).not.toHaveBeenCalled()
  })

  it('should revert vote count if voting fails', async () => {
    (useLocalStorage as jest.Mock).mockReturnValue(mockUseLocalStorage([]))

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    )

    const { result } = renderHook(() => useVote('destId', [], 'folderId'))

    await act(async () => {
      await result.current.handleVote('up')
    })

    expect(result.current.votesCount).toBe(0)
    expect(result.current.currentVote).toBeNull()
  })
})
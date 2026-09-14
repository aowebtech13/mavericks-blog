@if ($paginator->hasPages())
    <nav class="flex items-center justify-between" aria-label="Pagination">
        <div class="flex flex-1 items-center justify-between">
            <div>
                @if ($paginator->onFirstPage())
                    <span class="cursor-default rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-500">
                        {!! __('pagination.previous') !!}
                    </span>
                @else
                    <a href="{{ $paginator->previousPageUrl() }}" class="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-white/30 hover:text-white">
                        {!! __('pagination.previous') !!}
                    </a>
                @endif
            </div>

            <div class="hidden text-sm text-slate-400 sm:block">
                {{ __('Showing') }}
                @if ($paginator->firstItem())
                    <span class="font-medium text-white">{{ $paginator->firstItem() }}</span>
                    {{ __('to') }}
                    <span class="font-medium text-white">{{ $paginator->lastItem() }}</span>
                @else
                    {{ $paginator->count() }}
                @endif
                {{ __('of') }}
                <span class="font-medium text-white">{{ $paginator->total() }}</span>
                {{ __('results') }}
            </div>

            <div class="rounded-lg border border-white/10">
                {{-- Previous Page Link --}}
                @if ($paginator->onFirstPage())
                    <span aria-disabled="true" class="inline-flex cursor-default items-center px-3 py-2 text-sm text-slate-600">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                @else
                    <a href="{{ $paginator->previousPageUrl() }}" rel="prev" class="inline-flex items-center px-3 py-2 text-sm text-slate-400 transition hover:text-white" aria-label="{{ __('pagination.previous') }}">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                @endif

                {{-- Pagination Elements --}}
                @foreach ($elements as $element)
                    @if (is_string($element))
                        <span class="inline-flex cursor-default items-center px-3 py-2 text-sm text-slate-600">{{ $element }}</span>
                    @endif

                    @if (is_array($element))
                        @foreach ($element as $page => $url)
                            @if ($page == $paginator->currentPage())
                                <span aria-current="page" class="inline-flex items-center bg-accent px-3.5 py-2 text-sm font-semibold text-white">{{ $page }}</span>
                            @else
                                <a href="{{ $url }}" class="inline-flex items-center px-3.5 py-2 text-sm text-slate-400 transition hover:text-white" aria-label="{{ __('Go to page :page', ['page' => $page]) }}">
                                    {{ $page }}
                                </a>
                            @endif
                        @endforeach
                    @endif
                @endforeach

                {{-- Next Page Link --}}
                @if ($paginator->hasMorePages())
                    <a href="{{ $paginator->nextPageUrl() }}" rel="next" class="inline-flex items-center px-3 py-2 text-sm text-slate-400 transition hover:text-white" aria-label="{{ __('pagination.next') }}">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                @else
                    <span aria-disabled="true" class="inline-flex cursor-default items-center px-3 py-2 text-sm text-slate-600">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                @endif
            </div>
        </div>
    </nav>
@endif


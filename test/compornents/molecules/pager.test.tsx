import React from 'react'
import { render } from '../../testUtils'
import { PageItem } from '../../../data/page-item'
import Pager from '../../../components/molecules/pager'

type Pages = {
  page1: Element
  page2: Element
  page3: Element
  page4: Element
  page5: Element
  page6: Element
  page7: Element
  page8: Element
  page9: Element
  page10: Element
}

class Page {
  container: HTMLElement
  constructor(container: HTMLElement) {
    this.container = container
  }

  一ページ目リンク(): Element {
    return this.container.querySelector('.page-link-1')
  }

  二ページ目リンク(): Element {
    return this.container.querySelector('.page-link-2')
  }

  三ページ目リンク(): Element {
    return this.container.querySelector('.page-link-3')
  }

  四ページ目リンク(): Element {
    return this.container.querySelector('.page-link-4')
  }

  五ページ目リンク(): Element {
    return this.container.querySelector('.page-link-5')
  }

  六ページ目リンク(): Element {
    return this.container.querySelector('.page-link-6')
  }

  七ページ目リンク(): Element {
    return this.container.querySelector('.page-link-7')
  }

  八ページ目リンク(): Element {
    return this.container.querySelector('.page-link-8')
  }

  九ページ目リンク(): Element {
    return this.container.querySelector('.page-link-9')
  }

  十ページ目リンク(): Element {
    return this.container.querySelector('.page-link-10')
  }

  ページリンク一覧(): Pages {
    return {
      page1: this.一ページ目リンク(),
      page2: this.二ページ目リンク(),
      page3: this.三ページ目リンク(),
      page4: this.四ページ目リンク(),
      page5: this.五ページ目リンク(),
      page6: this.六ページ目リンク(),
      page7: this.七ページ目リンク(),
      page8: this.八ページ目リンク(),
      page9: this.九ページ目リンク(),
      page10: this.十ページ目リンク(),
    }
  }
}

const handleClick = async (): Promise<void> => {}

describe('Pager components', () => {
  it('matches snapshot', () => {
    const item: PageItem = {
      page: 1,
      totalPage: 10,
      totalCount: 97,
      perPage: 10,
    }
    const { asFragment } = render(
      <Pager pageItem={item} search={handleClick} />,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('全10ページ かつ 現在1ページ目を指定しているとき、ページャの数が期待値どおりであること', () => {
    const item: PageItem = {
      page: 1,
      totalPage: 10,
      totalCount: 97,
      perPage: 10,
    }
    const { container } = render(
      <Pager pageItem={item} search={handleClick} />,
      {}
    )
    const page = new Page(container)

    // 期待値
    // [1] 2 3 4 ... 10
    const { page1, page2, page3, page4, page5, page9, page10 } =
      page.ページリンク一覧()

    expect(page1).toBeTruthy()
    expect(page1.className).toContain('cursor-not-allowed')

    expect(page2).toBeTruthy()
    expect(page2.className).not.toContain('cursor-not-allowed')

    expect(page3).toBeTruthy()
    expect(page4).toBeTruthy()

    expect(page5).toBeNull()
    expect(page9).toBeNull()

    expect(page10).toBeTruthy()
    expect(page10.className).not.toContain('cursor-not-allowed')
  })

  it('全10ページ かつ 現在2ページ目を指定しているとき、ページャの数が期待値どおりであること', () => {
    const item: PageItem = {
      page: 2,
      totalPage: 10,
      totalCount: 97,
      perPage: 10,
    }
    const { container } = render(
      <Pager pageItem={item} search={handleClick} />,
      {}
    )
    const page = new Page(container)

    // 期待値
    // 1 [2] 3 4 5 ... 10
    const { page1, page2, page3, page4, page5, page6, page9, page10 } =
      page.ページリンク一覧()

    expect(page1).toBeTruthy()
    expect(page1.className).not.toContain('cursor-not-allowed')

    expect(page2).toBeTruthy()
    expect(page2.className).toContain('cursor-not-allowed')

    expect(page3).toBeTruthy()
    expect(page3.className).not.toContain('cursor-not-allowed')

    expect(page4).toBeTruthy()
    expect(page5).toBeTruthy()

    expect(page6).toBeNull()
    expect(page9).toBeNull()

    expect(page10).toBeTruthy()
    expect(page10.className).not.toContain('cursor-not-allowed')
  })

  it('全10ページ かつ 現在3ページ目を指定しているとき、ページャの数が期待値どおりであること', () => {
    const item: PageItem = {
      page: 3,
      totalPage: 10,
      totalCount: 97,
      perPage: 10,
    }
    const { container } = render(
      <Pager pageItem={item} search={handleClick} />,
      {}
    )
    const page = new Page(container)

    // 期待値
    // 1 2 [3] 4 5 6 ... 10
    const { page1, page2, page3, page4, page5, page6, page7, page9, page10 } =
      page.ページリンク一覧()

    expect(page1).toBeTruthy()
    expect(page1.className).not.toContain('cursor-not-allowed')

    expect(page2).toBeTruthy()
    expect(page2.className).not.toContain('cursor-not-allowed')

    expect(page3).toBeTruthy()
    expect(page3.className).toContain('cursor-not-allowed')

    expect(page4).toBeTruthy()
    expect(page4.className).not.toContain('cursor-not-allowed')

    expect(page5).toBeTruthy()
    expect(page6).toBeTruthy()

    expect(page7).toBeNull()
    expect(page9).toBeNull()

    expect(page10).toBeTruthy()
    expect(page10.className).not.toContain('cursor-not-allowed')
  })

  it('全10ページ かつ 現在4ページ目を指定しているとき、ページャの数が期待値どおりであること', () => {
    const item: PageItem = {
      page: 4,
      totalPage: 10,
      totalCount: 97,
      perPage: 10,
    }
    render(<Pager pageItem={item} search={handleClick} />, {})

    const { container } = render(
      <Pager pageItem={item} search={handleClick} />,
      {}
    )
    const page = new Page(container)

    // 期待値
    // 1 2 3 [4] 5 6 7 ... 10
    const {
      page1,
      page2,
      page3,
      page4,
      page5,
      page6,
      page7,
      page8,
      page9,
      page10,
    } = page.ページリンク一覧()

    expect(page1).toBeTruthy()
    expect(page1.className).not.toContain('cursor-not-allowed')

    expect(page2).toBeTruthy()
    expect(page2.className).not.toContain('cursor-not-allowed')

    expect(page3).toBeTruthy()
    expect(page3.className).not.toContain('cursor-not-allowed')

    expect(page4).toBeTruthy()
    expect(page4.className).toContain('cursor-not-allowed')

    expect(page5).toBeTruthy()
    expect(page5.className).not.toContain('cursor-not-allowed')

    expect(page6).toBeTruthy()
    expect(page7).toBeTruthy()

    expect(page8).toBeNull()
    expect(page9).toBeNull()

    expect(page10).toBeTruthy()
    expect(page10.className).not.toContain('cursor-not-allowed')
  })

  it('全10ページ かつ 現在5ページ目を指定しているとき、ページャの数が期待値どおりであること', () => {
    const item: PageItem = {
      page: 5,
      totalPage: 10,
      totalCount: 97,
      perPage: 10,
    }
    const { container } = render(
      <Pager pageItem={item} search={handleClick} />,
      {}
    )
    const page = new Page(container)

    // 期待値
    // 1 2 3 4 [5] 6 7 8 ... 10
    const {
      page1,
      page2,
      page3,
      page4,
      page5,
      page6,
      page7,
      page8,
      page9,
      page10,
    } = page.ページリンク一覧()

    expect(page1).toBeTruthy()
    expect(page1.className).not.toContain('cursor-not-allowed')

    expect(page2).toBeTruthy()
    expect(page2.className).not.toContain('cursor-not-allowed')

    expect(page3).toBeTruthy()
    expect(page3.className).not.toContain('cursor-not-allowed')

    expect(page4).toBeTruthy()
    expect(page4.className).not.toContain('cursor-not-allowed')

    expect(page5).toBeTruthy()
    expect(page5.className).toContain('cursor-not-allowed')

    expect(page6).toBeTruthy()
    expect(page6.className).not.toContain('cursor-not-allowed')

    expect(page7).toBeTruthy()
    expect(page8).toBeTruthy()

    expect(page9).toBeNull()

    expect(page10).toBeTruthy()
    expect(page10.className).not.toContain('cursor-not-allowed')
  })

  it('全10ページ かつ 現在6ページ目を指定しているとき、ページャの数が期待値どおりであること', () => {
    const item: PageItem = {
      page: 6,
      totalPage: 10,
      totalCount: 97,
      perPage: 10,
    }
    const { container } = render(
      <Pager pageItem={item} search={handleClick} />,
      {}
    )
    const page = new Page(container)

    // 期待値
    // 6ページ 1 ... 3 4 5 [6] 7 8 9 10
    const {
      page1,
      page2,
      page3,
      page4,
      page5,
      page6,
      page7,
      page8,
      page9,
      page10,
    } = page.ページリンク一覧()

    expect(page1).toBeTruthy()
    expect(page1.className).not.toContain('cursor-not-allowed')

    expect(page2).toBeNull()

    expect(page3).toBeTruthy()
    expect(page3.className).not.toContain('cursor-not-allowed')

    expect(page4).toBeTruthy()
    expect(page4.className).not.toContain('cursor-not-allowed')

    expect(page5).toBeTruthy()
    expect(page5.className).not.toContain('cursor-not-allowed')

    expect(page6).toBeTruthy()
    expect(page6.className).toContain('cursor-not-allowed')

    expect(page7).toBeTruthy()
    expect(page7.className).not.toContain('cursor-not-allowed')

    expect(page8).toBeTruthy()
    expect(page9).toBeTruthy()
    expect(page10).toBeTruthy()
    expect(page10.className).not.toContain('cursor-not-allowed')
  })

  it('全10ページ かつ 現在10ページ目を指定しているとき、ページャの数が期待値どおりであること', () => {
    const item: PageItem = {
      page: 10,
      totalPage: 10,
      totalCount: 97,
      perPage: 10,
    }
    const { container } = render(
      <Pager pageItem={item} search={handleClick} />,
      {}
    )
    const page = new Page(container)

    // 期待値
    // 10ページ 1 ... 7 8 9 [10]
    const {
      page1,
      page2,
      page3,
      page4,
      page5,
      page6,
      page7,
      page8,
      page9,
      page10,
    } = page.ページリンク一覧()

    expect(page1).toBeTruthy()
    expect(page1.className).not.toContain('cursor-not-allowed')

    expect(page2).toBeNull()
    expect(page3).toBeNull()
    expect(page4).toBeNull()
    expect(page5).toBeNull()
    expect(page6).toBeNull()

    expect(page7).toBeTruthy()
    expect(page7.className).not.toContain('cursor-not-allowed')

    expect(page8).toBeTruthy()
    expect(page8.className).not.toContain('cursor-not-allowed')

    expect(page9).toBeTruthy()
    expect(page9.className).not.toContain('cursor-not-allowed')

    expect(page10).toBeTruthy()
    expect(page10.className).toContain('cursor-not-allowed')
  })
})
